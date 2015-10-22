// 使用IndexedDB作为本地存储
(function(handler, win) {

  win.indexedDB = win.indexedDB || win.webkitIndexedDB || win.mozIndexedDB || win.OIndexedDB || win.msIndexedDB;
  win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction || win.msIDBTransaction || {READ_WRITE: "readwrite"};
  win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;

  var support = handler.support.indexedDB = win['indexedDB'];

  if (!support) return;

  var iPromise = handler.iPromise || Promise;

  var db;

  var request = win.indexedDB.open("mydb", 1);

  request.onerror = function(event) {
    console.error('Cannot open an IndexedDB connection.');
  };
  request.onsuccess = function(event) {
    db = event.target.result;
    db.onerror = function(event) {
      console.error("Database error: " + event.target.errorCode);
    };
  };
  request.onupgradeneeded = function(event) {
    db = event.target.result;
    if(!db.objectStoreNames.contains('shit')) {
      db.createObjectStore('shit', { keyPath: 'id' });
    }
  };

  var asyncStorage = {};

  asyncStorage.save = function(name, value) {
    return new iPromise(function(_resolve, _reject) {
      var transaction = db.transaction(name, 'readwrite');
      var store = transaction.objectStore(name);
      store.add(value);
    });
  };

  asyncStorage.find = function(name, where) {
    return new iPromise(function(_resolve, _reject) {
      var transaction = db.transaction(name, 'readonly');
      var store = transaction.objectStore(name);
    });
  };

  asyncStorage.remove = function(name, where) {};

  asyncStorage.clear = function() {};

  handler.store = asyncStorage;

})(J, window);
