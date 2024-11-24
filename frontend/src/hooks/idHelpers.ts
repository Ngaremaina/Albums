export const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("authDB", 1);
  
      request.onerror = () => {
        reject("Error opening IndexedDB");
      };
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("auth")) {
          db.createObjectStore("auth", { keyPath: "key" });
        }
      };
    });
  };
  
  export const storeData = async (key: string, value: unknown) => {
    const db = await openDatabase();
    const transaction = db.transaction("auth", "readwrite");
    const store = transaction.objectStore("auth");
    store.put({ key, value });
  };
  
  export const getData = async (key: string): Promise<unknown> => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("auth", "readonly");
      const store = transaction.objectStore("auth");
      const request = store.get(key);
  
      request.onsuccess = () => {
        resolve(request.result?.value);
      };
  
      request.onerror = () => {
        reject("Error getting data from IndexedDB");
      };
    });
  };
  
  export const removeData = async (key: string) => {
    const db = await openDatabase();
    const transaction = db.transaction("auth", "readwrite");
    const store = transaction.objectStore("auth");
    store.delete(key);
  };
  