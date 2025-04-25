import Parse from 'parse';

// Initialize Parse
export function initializeDB() {
  // In a real app, these would come from environment variables
  Parse.initialize('YOUR_APP_ID', 'YOUR_JS_KEY');
  Parse.serverURL = 'https://your-parse-server/parse';
}

// Generic function to create a new object
export async function createObject<T>(
  className: string, 
  data: Record<string, any>
): Promise<T> {
  const ParseObject = Parse.Object.extend(className);
  const object = new ParseObject();
  
  Object.entries(data).forEach(([key, value]) => {
    object.set(key, value);
  });
  
  await object.save();
  return parseObjectToJson(object) as T;
}

// Generic function to get an object by ID
export async function getObjectById<T>(
  className: string, 
  id: string
): Promise<T | null> {
  const query = new Parse.Query(className);
  const object = await query.get(id);
  
  if (!object) return null;
  return parseObjectToJson(object) as T;
}

// Generic function to query objects
export async function queryObjects<T>(
  className: string,
  constraints: Record<string, any> = {},
  limit: number = 100,
  skip: number = 0
): Promise<T[]> {
  const query = new Parse.Query(className);
  
  // Apply constraints
  Object.entries(constraints).forEach(([key, value]) => {
    if (value === undefined) return;
    
    if (key.endsWith('_eq')) {
      query.equalTo(key.replace('_eq', ''), value);
    } else if (key.endsWith('_ne')) {
      query.notEqualTo(key.replace('_ne', ''), value);
    } else if (key.endsWith('_lt')) {
      query.lessThan(key.replace('_lt', ''), value);
    } else if (key.endsWith('_lte')) {
      query.lessThanOrEqualTo(key.replace('_lte', ''), value);
    } else if (key.endsWith('_gt')) {
      query.greaterThan(key.replace('_gt', ''), value);
    } else if (key.endsWith('_gte')) {
      query.greaterThanOrEqualTo(key.replace('_gte', ''), value);
    } else {
      query.equalTo(key, value);
    }
  });
  
  query.limit(limit);
  query.skip(skip);
  
  const results = await query.find();
  return results.map(parseObjectToJson) as T[];
}

// Generic function to update an object
export async function updateObject<T>(
  className: string,
  id: string,
  data: Record<string, any>
): Promise<T | null> {
  const query = new Parse.Query(className);
  const object = await query.get(id);
  
  if (!object) return null;
  
  Object.entries(data).forEach(([key, value]) => {
    object.set(key, value);
  });
  
  await object.save();
  return parseObjectToJson(object) as T;
}

// Helper function to convert Parse object to plain JSON
function parseObjectToJson(parseObject: Parse.Object): Record<string, any> {
  const json = parseObject.toJSON();
  return {
    id: parseObject.id,
    ...json,
    createdAt: parseObject.createdAt,
    updatedAt: parseObject.updatedAt,
  };
}
