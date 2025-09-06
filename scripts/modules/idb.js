export default class PictorIDBController {
  db = null;
  version = 1;

  constructor () {
    this.init();
  };

  async init() {
    this.db = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!this.db) throw new Error("This browser doesn't support the IDBDatabase API.");

    const request = await this.db.open("PictorResourceDB", this.version);

    request.onsuccess = (event) => {
      // throw new Error(1);
    };
    
    request.onerror = (event) => {
      console.log(event);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      const store = db.createObjectStore("resources", { keyPath: "resourceId", autoIncrement: true });
      for (const name of [ "name", "filename", "blob", "timeCreate", "timeUpdate" ]) {
        store.createIndex(name, name, { unique: false });
      };

      store.transaction.oncomplete = (event) => {
        const transaction = db.transaction("resources", "readwrite");
        const resourceStore = transaction.objectStore("resources");

        transaction.oncomplete = (event) => {
          const x = db.transaction("resources", "readonly");

          x.oncomplete = (event) => {
          };

          const y = x.objectStore("resources");
          (async () => {
            const r = await y.getAll();
          })();
        };

        transaction.onerror = (event) => {
        };

        resourceStore.add({ name: "test", filename: "123", blob: new Blob([ "test" ], { type: "text/plain" }), timeCreate: new Date(), timeUpdate: new Date() });
      };
    }
  };
};