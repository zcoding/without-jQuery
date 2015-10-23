// 使用IndexedDB作为本地存储

(function(handler, win) {

  var asyncStorage = {
    version: 1
  };

  asyncStorage.indexedDB = win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
  asyncStorage.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction || win.msIDBTransaction || {READ_WRITE: "readwrite"};
  asyncStorage.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;

  var support = handler.support.indexedDB = !!asyncStorage['indexedDB'];

  if (!support) return;

  function openDataErrorCallback(event) {
    console.error("Cannot open database. Error: " + event.target.errorCode);
  }

  // function openDatabase(dbName) {
  //   var openDBRequest = asyncStorage.indexedDB.open(dbName);
  //   openDBRequest.onerror = openDataErrorCallback;
  //   openDBRequest.onsuccess = function(event) {
  //     asyncStorage.db = openDBRequest.result;
  //   };
  // }

  function openDatabase(dbName, version) {
    asyncStorage.version = version || 1;
    // var deleteDBRequest = asyncStorage.indexedDB.deleteDatabase(dbName);
    // deleteDBRequest.onsuccess = function (event) {
      var openDBRequest = asyncStorage.indexedDB.open(dbName, asyncStorage.version);
      openDBRequest.onerror = openDataErrorCallback;
      openDBRequest.onsuccess = function(event) {
        asyncStorage.db = openDBRequest.result;
        // 数据增删改查
      };
      openDBRequest.onupgradeneeded = function(event) {
        var db = event.currentTarget.result;
        // 初始化数据库表结构
        db.createObjectStore('orderList', { keyPath: 'id' });
        db.createObjectStore('userList', { keyPath: 'id' });
      };
    // };
    // deleteDBRequest.onerror = function(err) {
    //   console.error("Cannot delete database. Error: " + err);
    // };
  }

  asyncStorage.use = function(dbName) {
    openDatabase(dbName);
  };

  asyncStorage.save = function() {
    var db = asyncStorage.db;
    var transaction = db.transaction('cache', 'readwrite');
    var store = transaction.objectStore('cache');
    // store.add();
  };

  asyncStorage.find = function(name, where) {};

  asyncStorage.remove = function(name, where) {};

  asyncStorage.clear = function() {};

  handler.store = asyncStorage;

})(J, window);
