// .build/vendor/anisette-rs.js
async function Module2(moduleArg = {}) {
  var moduleRtn;
  (function() {
    function humanReadableVersionToPacked(str) {
      str = str.split("-")[0];
      var vers = str.split(".").slice(0, 3);
      while (vers.length < 3) vers.push("00");
      vers = vers.map((n, i2, arr) => n.padStart(2, "0"));
      return vers.join("");
    }
    var packedVersionToHumanReadable = (n) => [n / 1e4 | 0, (n / 100 | 0) % 100, n % 100].join(".");
    var TARGET_NOT_SUPPORTED = 2147483647;
    var currentNodeVersion = typeof process !== "undefined" && process.versions?.node ? humanReadableVersionToPacked(process.versions.node) : TARGET_NOT_SUPPORTED;
    if (currentNodeVersion < TARGET_NOT_SUPPORTED) {
      throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    }
    if (currentNodeVersion < 2147483647) {
      throw new Error(`This emscripten-generated code requires node v${packedVersionToHumanReadable(2147483647)} (detected v${packedVersionToHumanReadable(currentNodeVersion)})`);
    }
    var userAgent = typeof navigator !== "undefined" && navigator.userAgent;
    if (!userAgent) {
      return;
    }
    var currentSafariVersion = userAgent.includes("Safari/") && !userAgent.includes("Chrome/") && userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/) ? humanReadableVersionToPacked(userAgent.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : TARGET_NOT_SUPPORTED;
    if (currentSafariVersion < 15e4) {
      throw new Error(`This emscripten-generated code requires Safari v${packedVersionToHumanReadable(15e4)} (detected v${currentSafariVersion})`);
    }
    var currentFirefoxVersion = userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
    if (currentFirefoxVersion < 79) {
      throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${currentFirefoxVersion})`);
    }
    var currentChromeVersion = userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(userAgent.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : TARGET_NOT_SUPPORTED;
    if (currentChromeVersion < 85) {
      throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${currentChromeVersion})`);
    }
  })();
  var Module = moduleArg;
  var ENVIRONMENT_IS_WEB = !!globalThis.window;
  var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
  var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
  var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = (status, toThrow) => {
    throw toThrow;
  };
  var _scriptName = import.meta.url;
  var scriptDirectory = "";
  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
  }
  var readAsync, readBinary;
  if (ENVIRONMENT_IS_SHELL) {
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    try {
      scriptDirectory = new URL(".", _scriptName).href;
    } catch {
    }
    if (!(globalThis.window || globalThis.WorkerGlobalScope)) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    {
      readAsync = async (url) => {
        assert(!isFileURI(url), "readAsync does not work with file:// URLs");
        var response = await fetch(url, { credentials: "same-origin" });
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw new Error(response.status + " : " + response.url);
      };
    }
  } else {
    throw new Error("environment detection error");
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js";
  var WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js";
  var FETCHFS = "FETCHFS is no longer included by default; build with -lfetchfs.js";
  var ICASEFS = "ICASEFS is no longer included by default; build with -licasefs.js";
  var JSFILEFS = "JSFILEFS is no longer included by default; build with -ljsfilefs.js";
  var OPFS = "OPFS is no longer included by default; build with -lopfs.js";
  var NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js";
  assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time.  Add `worker` to `-sENVIRONMENT` to enable.");
  assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.");
  assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
  var wasmBinary;
  if (!globalThis.WebAssembly) {
    err("no native wasm support detected");
  }
  var ABORT = false;
  var EXITSTATUS;
  function assert(condition, text) {
    if (!condition) {
      abort("Assertion failed" + (text ? ": " + text : ""));
    }
  }
  var isFileURI = (filename) => filename.startsWith("file://");
  function writeStackCookie() {
    var max = _emscripten_stack_get_end();
    assert((max & 3) == 0);
    if (max == 0) {
      max += 4;
    }
    HEAPU32[max >> 2] = 34821223;
    HEAPU32[max + 4 >> 2] = 2310721022;
    HEAPU32[0 >> 2] = 1668509029;
  }
  function checkStackCookie() {
    if (ABORT) return;
    var max = _emscripten_stack_get_end();
    if (max == 0) {
      max += 4;
    }
    var cookie1 = HEAPU32[max >> 2];
    var cookie2 = HEAPU32[max + 4 >> 2];
    if (cookie1 != 34821223 || cookie2 != 2310721022) {
      abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
    }
    if (HEAPU32[0 >> 2] != 1668509029) {
      abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
    }
  }
  var runtimeDebug = true;
  function dbg(...args) {
    if (!runtimeDebug && typeof runtimeDebug != "undefined") return;
    console.warn(...args);
  }
  (() => {
    var h16 = new Int16Array(1);
    var h8 = new Int8Array(h16.buffer);
    h16[0] = 25459;
    if (h8[0] !== 115 || h8[1] !== 99) abort("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
  })();
  function consumedModuleProp(prop) {
    if (!Object.getOwnPropertyDescriptor(Module, prop)) {
      Object.defineProperty(Module, prop, {
        configurable: true,
        set() {
          abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
        }
      });
    }
  }
  function makeInvalidEarlyAccess(name) {
    return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);
  }
  function ignoredModuleProp(prop) {
    if (Object.getOwnPropertyDescriptor(Module, prop)) {
      abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
    }
  }
  function isExportedByForceFilesystem(name) {
    return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_preloadFile" || name === "FS_unlink" || name === "addRunDependency" || // The old FS has some functionality that WasmFS lacks.
    name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency";
  }
  function missingLibrarySymbol(sym) {
    unexportedRuntimeSymbol(sym);
  }
  function unexportedRuntimeSymbol(sym) {
    if (!Object.getOwnPropertyDescriptor(Module, sym)) {
      Object.defineProperty(Module, sym, {
        configurable: true,
        get() {
          var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
          if (isExportedByForceFilesystem(sym)) {
            msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you";
          }
          abort(msg);
        }
      });
    }
  }
  function binaryDecode(bin) {
    for (var i2 = 0, l = bin.length, o = new Uint8Array(l), c; i2 < l; ++i2) {
      c = bin.charCodeAt(i2);
      o[i2] = ~c >> 8 & c;
    }
    return o;
  }
  var readyPromiseResolve, readyPromiseReject;
  var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  var HEAP64, HEAPU64;
  var runtimeInitialized = false;
  function updateMemoryViews() {
    var b = wasmMemory.buffer;
    HEAP8 = new Int8Array(b);
    HEAP16 = new Int16Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    HEAPU16 = new Uint16Array(b);
    HEAP32 = new Int32Array(b);
    HEAPU32 = new Uint32Array(b);
    HEAPF32 = new Float32Array(b);
    HEAPF64 = new Float64Array(b);
    HEAP64 = new BigInt64Array(b);
    HEAPU64 = new BigUint64Array(b);
  }
  assert(
    globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set,
    "JS engine does not provide full typed array support"
  );
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    consumedModuleProp("preRun");
    callRuntimeCallbacks(onPreRuns);
  }
  function initRuntime() {
    assert(!runtimeInitialized);
    runtimeInitialized = true;
    checkStackCookie();
    if (!Module["noFSInit"] && !FS.initialized) FS.init();
    TTY.init();
    wasmExports["__wasm_call_ctors"]();
    FS.ignorePermissions = false;
  }
  function postRun() {
    checkStackCookie();
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    consumedModuleProp("postRun");
    callRuntimeCallbacks(onPostRuns);
  }
  function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject?.(e);
    throw e;
  }
  function createExportWrapper(name, nargs) {
    return (...args) => {
      assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
      var f = wasmExports[name];
      assert(f, `exported native function \`${name}\` not found`);
      assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
      return f(...args);
    };
  }
  var wasmBinaryFile;
  function findWasmBinary() {
    throw new Error("External anisette.wasm module required");
  }
  function getBinarySync(file) {
    return file;
  }
  async function getWasmBinary(binaryFile) {
    return getBinarySync(binaryFile);
  }
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary = await getWasmBinary(binaryFile);
      var instance = await WebAssembly.instantiate(binary, imports);
      return instance;
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      if (isFileURI(binaryFile)) {
        err(`warning: Loading from a file URI (${binaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
      }
      abort(reason);
    }
  }
  async function instantiateAsync(binary, binaryFile, imports) {
    return instantiateArrayBuffer(binaryFile, imports);
  }
  function getWasmImports() {
    var imports = {
      "env": wasmImports,
      "wasi_snapshot_preview1": wasmImports
    };
    return imports;
  }
  async function createWasm() {
    function receiveInstance(instance, module) {
      wasmExports = instance.exports;
      assignWasmExports(wasmExports);
      updateMemoryViews();
      return wasmExports;
    }
    var trueModule = Module;
    function receiveInstantiationResult(result2) {
      assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
      trueModule = null;
      return receiveInstance(result2["instance"]);
    }
    var info = getWasmImports();
    if (Module["instantiateWasm"]) {
      return new Promise((resolve, reject) => {
        try {
          Module["instantiateWasm"](info, (inst, mod) => {
            resolve(receiveInstance(inst, mod));
          });
        } catch (e) {
          err(`Module.instantiateWasm callback failed with error: ${e}`);
          reject(e);
        }
      });
    }
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports = receiveInstantiationResult(result);
    return exports;
  }
  class ExitStatus {
    name = "ExitStatus";
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var callRuntimeCallbacks = (callbacks) => {
    while (callbacks.length > 0) {
      callbacks.shift()(Module);
    }
  };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);
  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);
  var base64Decode = (b64) => {
    assert(b64.length % 4 == 0);
    var b1, b2, i2 = 0, j = 0, bLength = b64.length;
    var output = new Uint8Array((bLength * 3 >> 2) - (b64[bLength - 2] == "=") - (b64[bLength - 1] == "="));
    for (; i2 < bLength; i2 += 4, j += 3) {
      b1 = base64ReverseLookup[b64.charCodeAt(i2 + 1)];
      b2 = base64ReverseLookup[b64.charCodeAt(i2 + 2)];
      output[j] = base64ReverseLookup[b64.charCodeAt(i2)] << 2 | b1 >> 4;
      output[j + 1] = b1 << 4 | b2 >> 2;
      output[j + 2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i2 + 3)];
    }
    return output;
  };
  function getValue(ptr2, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        return HEAP8[ptr2];
      case "i8":
        return HEAP8[ptr2];
      case "i16":
        return HEAP16[ptr2 >> 1];
      case "i32":
        return HEAP32[ptr2 >> 2];
      case "i64":
        return HEAP64[ptr2 >> 3];
      case "float":
        return HEAPF32[ptr2 >> 2];
      case "double":
        return HEAPF64[ptr2 >> 3];
      case "*":
        return HEAPU32[ptr2 >> 2];
      default:
        abort(`invalid type for getValue: ${type}`);
    }
  }
  var noExitRuntime = true;
  var ptrToString = (ptr2) => {
    assert(typeof ptr2 === "number", `ptrToString expects a number, got ${typeof ptr2}`);
    ptr2 >>>= 0;
    return "0x" + ptr2.toString(16).padStart(8, "0");
  };
  function setValue(ptr2, value, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        HEAP8[ptr2] = value;
        break;
      case "i8":
        HEAP8[ptr2] = value;
        break;
      case "i16":
        HEAP16[ptr2 >> 1] = value;
        break;
      case "i32":
        HEAP32[ptr2 >> 2] = value;
        break;
      case "i64":
        HEAP64[ptr2 >> 3] = BigInt(value);
        break;
      case "float":
        HEAPF32[ptr2 >> 2] = value;
        break;
      case "double":
        HEAPF64[ptr2 >> 3] = value;
        break;
      case "*":
        HEAPU32[ptr2 >> 2] = value;
        break;
      default:
        abort(`invalid type for setValue: ${type}`);
    }
  }
  var stackRestore = (val) => __emscripten_stack_restore(val);
  var stackSave = () => _emscripten_stack_get_current();
  var warnOnce = (text) => {
    warnOnce.shown ||= {};
    if (!warnOnce.shown[text]) {
      warnOnce.shown[text] = 1;
      err(text);
    }
  };
  var wasmTableMirror = [];
  var getWasmTableEntry = (funcPtr) => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
      wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
    }
    assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
    return func;
  };
  var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
  var exceptionLast = 0;
  class ExceptionInfo {
    // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
    constructor(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
    }
    set_type(type) {
      HEAPU32[this.ptr + 4 >> 2] = type;
    }
    get_type() {
      return HEAPU32[this.ptr + 4 >> 2];
    }
    set_destructor(destructor) {
      HEAPU32[this.ptr + 8 >> 2] = destructor;
    }
    get_destructor() {
      return HEAPU32[this.ptr + 8 >> 2];
    }
    set_caught(caught) {
      caught = caught ? 1 : 0;
      HEAP8[this.ptr + 12] = caught;
    }
    get_caught() {
      return HEAP8[this.ptr + 12] != 0;
    }
    set_rethrown(rethrown) {
      rethrown = rethrown ? 1 : 0;
      HEAP8[this.ptr + 13] = rethrown;
    }
    get_rethrown() {
      return HEAP8[this.ptr + 13] != 0;
    }
    // Initialize native structure fields. Should be called once after allocated.
    init(type, destructor) {
      this.set_adjusted_ptr(0);
      this.set_type(type);
      this.set_destructor(destructor);
    }
    set_adjusted_ptr(adjustedPtr) {
      HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
    }
    get_adjusted_ptr() {
      return HEAPU32[this.ptr + 16 >> 2];
    }
  }
  var setTempRet0 = (val) => __emscripten_tempret_set(val);
  var findMatchingCatch = (args) => {
    var thrown = exceptionLast;
    if (!thrown) {
      setTempRet0(0);
      return 0;
    }
    var info = new ExceptionInfo(thrown);
    info.set_adjusted_ptr(thrown);
    var thrownType = info.get_type();
    if (!thrownType) {
      setTempRet0(0);
      return thrown;
    }
    for (var caughtType of args) {
      if (caughtType === 0 || caughtType === thrownType) {
        break;
      }
      var adjusted_ptr_addr = info.ptr + 16;
      if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
        setTempRet0(caughtType);
        return thrown;
      }
    }
    setTempRet0(thrownType);
    return thrown;
  };
  var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr2, type, destructor) => {
    var info = new ExceptionInfo(ptr2);
    info.init(type, destructor);
    exceptionLast = ptr2;
    uncaughtExceptionCount++;
    assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
  };
  var ___resumeException = (ptr2) => {
    if (!exceptionLast) {
      exceptionLast = ptr2;
    }
    assert(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
  };
  var syscallGetVarargI = () => {
    assert(SYSCALLS.varargs != void 0);
    var ret = HEAP32[+SYSCALLS.varargs >> 2];
    SYSCALLS.varargs += 4;
    return ret;
  };
  var syscallGetVarargP = syscallGetVarargI;
  var PATH = {
    isAbs: (path) => path.charAt(0) === "/",
    splitPath: (filename) => {
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      return splitPathRe.exec(filename).slice(1);
    },
    normalizeArray: (parts, allowAboveRoot) => {
      var up = 0;
      for (var i2 = parts.length - 1; i2 >= 0; i2--) {
        var last = parts[i2];
        if (last === ".") {
          parts.splice(i2, 1);
        } else if (last === "..") {
          parts.splice(i2, 1);
          up++;
        } else if (up) {
          parts.splice(i2, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up; up--) {
          parts.unshift("..");
        }
      }
      return parts;
    },
    normalize: (path) => {
      var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
      path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
      if (!path && !isAbsolute) {
        path = ".";
      }
      if (path && trailingSlash) {
        path += "/";
      }
      return (isAbsolute ? "/" : "") + path;
    },
    dirname: (path) => {
      var result = PATH.splitPath(path), root = result[0], dir = result[1];
      if (!root && !dir) {
        return ".";
      }
      if (dir) {
        dir = dir.slice(0, -1);
      }
      return root + dir;
    },
    basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
    join: (...paths) => PATH.normalize(paths.join("/")),
    join2: (l, r) => PATH.normalize(l + "/" + r)
  };
  var initRandomFill = () => {
    return (view) => crypto.getRandomValues(view);
  };
  var randomFill = (view) => {
    (randomFill = initRandomFill())(view);
  };
  var PATH_FS = {
    resolve: (...args) => {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i2 = args.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
        var path = i2 >= 0 ? args[i2] : FS.cwd();
        if (typeof path != "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path) {
          return "";
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = PATH.isAbs(path);
      }
      resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    },
    relative: (from, to) => {
      from = PATH_FS.resolve(from).slice(1);
      to = PATH_FS.resolve(to).slice(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "") break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "") break;
        }
        if (start > end) return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i2 = 0; i2 < length; i2++) {
        if (fromParts[i2] !== toParts[i2]) {
          samePartsLength = i2;
          break;
        }
      }
      var outputParts = [];
      for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    }
  };
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx;
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx;
  };
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) {
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  };
  var FS_stdin_getChar_buffer = [];
  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var c = str.charCodeAt(i2);
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i2;
      } else {
        len += 3;
      }
    }
    return len;
  };
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
    if (!(maxBytesToWrite > 0))
      return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var u = str.codePointAt(i2);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        if (u > 1114111) warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
        i2++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  };
  var intArrayFromString = (stringy, dontAddNull, length) => {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  };
  var FS_stdin_getChar = () => {
    if (!FS_stdin_getChar_buffer.length) {
      var result = null;
      if (globalThis.window?.prompt) {
        result = window.prompt("Input: ");
        if (result !== null) {
          result += "\n";
        }
      } else {
      }
      if (!result) {
        return null;
      }
      FS_stdin_getChar_buffer = intArrayFromString(result, true);
    }
    return FS_stdin_getChar_buffer.shift();
  };
  var TTY = {
    ttys: [],
    init() {
    },
    shutdown() {
    },
    register(dev, ops) {
      TTY.ttys[dev] = { input: [], output: [], ops };
      FS.registerDevice(dev, TTY.stream_ops);
    },
    stream_ops: {
      open(stream) {
        var tty = TTY.ttys[stream.node.rdev];
        if (!tty) {
          throw new FS.ErrnoError(43);
        }
        stream.tty = tty;
        stream.seekable = false;
      },
      close(stream) {
        stream.tty.ops.fsync(stream.tty);
      },
      fsync(stream) {
        stream.tty.ops.fsync(stream.tty);
      },
      read(stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.get_char) {
          throw new FS.ErrnoError(60);
        }
        var bytesRead = 0;
        for (var i2 = 0; i2 < length; i2++) {
          var result;
          try {
            result = stream.tty.ops.get_char(stream.tty);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === void 0 && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === void 0) break;
          bytesRead++;
          buffer[offset + i2] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        if (!stream.tty || !stream.tty.ops.put_char) {
          throw new FS.ErrnoError(60);
        }
        try {
          for (var i2 = 0; i2 < length; i2++) {
            stream.tty.ops.put_char(stream.tty, buffer[offset + i2]);
          }
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i2;
      }
    },
    default_tty_ops: {
      get_char(tty) {
        return FS_stdin_getChar();
      },
      put_char(tty, val) {
        if (val === null || val === 10) {
          out(UTF8ArrayToString(tty.output));
          tty.output = [];
        } else {
          if (val != 0) tty.output.push(val);
        }
      },
      fsync(tty) {
        if (tty.output?.length > 0) {
          out(UTF8ArrayToString(tty.output));
          tty.output = [];
        }
      },
      ioctl_tcgets(tty) {
        return {
          c_iflag: 25856,
          c_oflag: 5,
          c_cflag: 191,
          c_lflag: 35387,
          c_cc: [
            3,
            28,
            127,
            21,
            4,
            0,
            1,
            0,
            17,
            19,
            26,
            0,
            18,
            15,
            23,
            22,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]
        };
      },
      ioctl_tcsets(tty, optional_actions, data) {
        return 0;
      },
      ioctl_tiocgwinsz(tty) {
        return [24, 80];
      }
    },
    default_tty1_ops: {
      put_char(tty, val) {
        if (val === null || val === 10) {
          err(UTF8ArrayToString(tty.output));
          tty.output = [];
        } else {
          if (val != 0) tty.output.push(val);
        }
      },
      fsync(tty) {
        if (tty.output?.length > 0) {
          err(UTF8ArrayToString(tty.output));
          tty.output = [];
        }
      }
    }
  };
  var mmapAlloc = (size) => {
    abort("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
  };
  var MEMFS = {
    ops_table: null,
    mount(mount) {
      return MEMFS.createNode(null, "/", 16895, 0);
    },
    createNode(parent, name, mode, dev) {
      if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
        throw new FS.ErrnoError(63);
      }
      MEMFS.ops_table ||= {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek
          }
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync
          }
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink
          },
          stream: {}
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: FS.chrdev_stream_ops
        }
      };
      var node = FS.createNode(parent, name, mode, dev);
      if (FS.isDir(node.mode)) {
        node.node_ops = MEMFS.ops_table.dir.node;
        node.stream_ops = MEMFS.ops_table.dir.stream;
        node.contents = {};
      } else if (FS.isFile(node.mode)) {
        node.node_ops = MEMFS.ops_table.file.node;
        node.stream_ops = MEMFS.ops_table.file.stream;
        node.usedBytes = 0;
        node.contents = null;
      } else if (FS.isLink(node.mode)) {
        node.node_ops = MEMFS.ops_table.link.node;
        node.stream_ops = MEMFS.ops_table.link.stream;
      } else if (FS.isChrdev(node.mode)) {
        node.node_ops = MEMFS.ops_table.chrdev.node;
        node.stream_ops = MEMFS.ops_table.chrdev.stream;
      }
      node.atime = node.mtime = node.ctime = Date.now();
      if (parent) {
        parent.contents[name] = node;
        parent.atime = parent.mtime = parent.ctime = node.atime;
      }
      return node;
    },
    getFileDataAsTypedArray(node) {
      if (!node.contents) return new Uint8Array(0);
      if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
      return new Uint8Array(node.contents);
    },
    expandFileStorage(node, newCapacity) {
      var prevCapacity = node.contents ? node.contents.length : 0;
      if (prevCapacity >= newCapacity) return;
      var CAPACITY_DOUBLING_MAX = 1024 * 1024;
      newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
      if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
      var oldContents = node.contents;
      node.contents = new Uint8Array(newCapacity);
      if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
    },
    resizeFileStorage(node, newSize) {
      if (node.usedBytes == newSize) return;
      if (newSize == 0) {
        node.contents = null;
        node.usedBytes = 0;
      } else {
        var oldContents = node.contents;
        node.contents = new Uint8Array(newSize);
        if (oldContents) {
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
        }
        node.usedBytes = newSize;
      }
    },
    node_ops: {
      getattr(node) {
        var attr = {};
        attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
        attr.ino = node.id;
        attr.mode = node.mode;
        attr.nlink = 1;
        attr.uid = 0;
        attr.gid = 0;
        attr.rdev = node.rdev;
        if (FS.isDir(node.mode)) {
          attr.size = 4096;
        } else if (FS.isFile(node.mode)) {
          attr.size = node.usedBytes;
        } else if (FS.isLink(node.mode)) {
          attr.size = node.link.length;
        } else {
          attr.size = 0;
        }
        attr.atime = new Date(node.atime);
        attr.mtime = new Date(node.mtime);
        attr.ctime = new Date(node.ctime);
        attr.blksize = 4096;
        attr.blocks = Math.ceil(attr.size / attr.blksize);
        return attr;
      },
      setattr(node, attr) {
        for (const key of ["mode", "atime", "mtime", "ctime"]) {
          if (attr[key] != null) {
            node[key] = attr[key];
          }
        }
        if (attr.size !== void 0) {
          MEMFS.resizeFileStorage(node, attr.size);
        }
      },
      lookup(parent, name) {
        throw new FS.ErrnoError(44);
      },
      mknod(parent, name, mode, dev) {
        return MEMFS.createNode(parent, name, mode, dev);
      },
      rename(old_node, new_dir, new_name) {
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
        }
        if (new_node) {
          if (FS.isDir(old_node.mode)) {
            for (var i2 in new_node.contents) {
              throw new FS.ErrnoError(55);
            }
          }
          FS.hashRemoveNode(new_node);
        }
        delete old_node.parent.contents[old_node.name];
        new_dir.contents[new_name] = old_node;
        old_node.name = new_name;
        new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
      },
      unlink(parent, name) {
        delete parent.contents[name];
        parent.ctime = parent.mtime = Date.now();
      },
      rmdir(parent, name) {
        var node = FS.lookupNode(parent, name);
        for (var i2 in node.contents) {
          throw new FS.ErrnoError(55);
        }
        delete parent.contents[name];
        parent.ctime = parent.mtime = Date.now();
      },
      readdir(node) {
        return [".", "..", ...Object.keys(node.contents)];
      },
      symlink(parent, newname, oldpath) {
        var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
        node.link = oldpath;
        return node;
      },
      readlink(node) {
        if (!FS.isLink(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        return node.link;
      }
    },
    stream_ops: {
      read(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= stream.node.usedBytes) return 0;
        var size = Math.min(stream.node.usedBytes - position, length);
        assert(size >= 0);
        if (size > 8 && contents.subarray) {
          buffer.set(contents.subarray(position, position + size), offset);
        } else {
          for (var i2 = 0; i2 < size; i2++) buffer[offset + i2] = contents[position + i2];
        }
        return size;
      },
      write(stream, buffer, offset, length, position, canOwn) {
        assert(!(buffer instanceof ArrayBuffer));
        if (buffer.buffer === HEAP8.buffer) {
          canOwn = false;
        }
        if (!length) return 0;
        var node = stream.node;
        node.mtime = node.ctime = Date.now();
        if (buffer.subarray && (!node.contents || node.contents.subarray)) {
          if (canOwn) {
            assert(position === 0, "canOwn must imply no weird position inside the file");
            node.contents = buffer.subarray(offset, offset + length);
            node.usedBytes = length;
            return length;
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = buffer.slice(offset, offset + length);
            node.usedBytes = length;
            return length;
          } else if (position + length <= node.usedBytes) {
            node.contents.set(buffer.subarray(offset, offset + length), position);
            return length;
          }
        }
        MEMFS.expandFileStorage(node, position + length);
        if (node.contents.subarray && buffer.subarray) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
        } else {
          for (var i2 = 0; i2 < length; i2++) {
            node.contents[position + i2] = buffer[offset + i2];
          }
        }
        node.usedBytes = Math.max(node.usedBytes, position + length);
        return length;
      },
      llseek(stream, offset, whence) {
        var position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            position += stream.node.usedBytes;
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28);
        }
        return position;
      },
      mmap(stream, length, position, prot, flags) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        var ptr2;
        var allocated;
        var contents = stream.node.contents;
        if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
          allocated = false;
          ptr2 = contents.byteOffset;
        } else {
          allocated = true;
          ptr2 = mmapAlloc(length);
          if (!ptr2) {
            throw new FS.ErrnoError(48);
          }
          if (contents) {
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            HEAP8.set(contents, ptr2);
          }
        }
        return { ptr: ptr2, allocated };
      },
      msync(stream, buffer, offset, length, mmapFlags) {
        MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
        return 0;
      }
    }
  };
  var FS_modeStringToFlags = (str) => {
    var flagModes = {
      "r": 0,
      "r+": 2,
      "w": 512 | 64 | 1,
      "w+": 512 | 64 | 2,
      "a": 1024 | 64 | 1,
      "a+": 1024 | 64 | 2
    };
    var flags = flagModes[str];
    if (typeof flags == "undefined") {
      throw new Error(`Unknown file open mode: ${str}`);
    }
    return flags;
  };
  var FS_getMode = (canRead, canWrite) => {
    var mode = 0;
    if (canRead) mode |= 292 | 73;
    if (canWrite) mode |= 146;
    return mode;
  };
  var IDBFS = {
    dbs: {},
    indexedDB: () => {
      assert(typeof indexedDB != "undefined", "IDBFS used, but indexedDB not supported");
      return indexedDB;
    },
    DB_VERSION: 21,
    DB_STORE_NAME: "FILE_DATA",
    queuePersist: (mount) => {
      function onPersistComplete() {
        if (mount.idbPersistState === "again") startPersist();
        else mount.idbPersistState = 0;
      }
      function startPersist() {
        mount.idbPersistState = "idb";
        IDBFS.syncfs(
          mount,
          /*populate:*/
          false,
          onPersistComplete
        );
      }
      if (!mount.idbPersistState) {
        mount.idbPersistState = setTimeout(startPersist, 0);
      } else if (mount.idbPersistState === "idb") {
        mount.idbPersistState = "again";
      }
    },
    mount: (mount) => {
      var mnt = MEMFS.mount(mount);
      if (mount?.opts?.autoPersist) {
        mount.idbPersistState = 0;
        var memfs_node_ops = mnt.node_ops;
        mnt.node_ops = { ...mnt.node_ops };
        mnt.node_ops.mknod = (parent, name, mode, dev) => {
          var node = memfs_node_ops.mknod(parent, name, mode, dev);
          node.node_ops = mnt.node_ops;
          node.idbfs_mount = mnt.mount;
          node.memfs_stream_ops = node.stream_ops;
          node.stream_ops = { ...node.stream_ops };
          node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
            stream.node.isModified = true;
            return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
          };
          node.stream_ops.close = (stream) => {
            var n = stream.node;
            if (n.isModified) {
              IDBFS.queuePersist(n.idbfs_mount);
              n.isModified = false;
            }
            if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
          };
          IDBFS.queuePersist(mnt.mount);
          return node;
        };
        mnt.node_ops.rmdir = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
        mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
        mnt.node_ops.unlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
        mnt.node_ops.rename = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
      }
      return mnt;
    },
    syncfs: (mount, populate, callback) => {
      IDBFS.getLocalSet(mount, (err2, local) => {
        if (err2) return callback(err2);
        IDBFS.getRemoteSet(mount, (err3, remote) => {
          if (err3) return callback(err3);
          var src = populate ? remote : local;
          var dst = populate ? local : remote;
          IDBFS.reconcile(src, dst, callback);
        });
      });
    },
    quit: () => {
      for (var value of Object.values(IDBFS.dbs)) {
        value.close();
      }
      IDBFS.dbs = {};
    },
    getDB: (name, callback) => {
      var db = IDBFS.dbs[name];
      if (db) {
        return callback(null, db);
      }
      var req;
      try {
        req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
      } catch (e) {
        return callback(e);
      }
      if (!req) {
        return callback("Unable to connect to IndexedDB");
      }
      req.onupgradeneeded = (e) => {
        var db2 = (
          /** @type {IDBDatabase} */
          e.target.result
        );
        var transaction = e.target.transaction;
        var fileStore;
        if (db2.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
          fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
        } else {
          fileStore = db2.createObjectStore(IDBFS.DB_STORE_NAME);
        }
        if (!fileStore.indexNames.contains("timestamp")) {
          fileStore.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
      req.onsuccess = () => {
        db = /** @type {IDBDatabase} */
        req.result;
        IDBFS.dbs[name] = db;
        callback(null, db);
      };
      req.onerror = (e) => {
        callback(e.target.error);
        e.preventDefault();
      };
    },
    getLocalSet: (mount, callback) => {
      var entries = {};
      function isRealDir(p) {
        return p !== "." && p !== "..";
      }
      ;
      function toAbsolute(root) {
        return (p) => PATH.join2(root, p);
      }
      ;
      var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
      while (check.length) {
        var path = check.pop();
        var stat;
        try {
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
        if (FS.isDir(stat.mode)) {
          check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
        }
        entries[path] = { "timestamp": stat.mtime };
      }
      return callback(null, { type: "local", entries });
    },
    getRemoteSet: (mount, callback) => {
      var entries = {};
      IDBFS.getDB(mount.mountpoint, (err2, db) => {
        if (err2) return callback(err2);
        try {
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
          transaction.onerror = (e) => {
            callback(e.target.error);
            e.preventDefault();
          };
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index("timestamp");
          index.openKeyCursor().onsuccess = (event) => {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: "remote", db, entries });
            }
            entries[cursor.primaryKey] = { "timestamp": cursor.key };
            cursor.continue();
          };
        } catch (e) {
          return callback(e);
        }
      });
    },
    loadLocalEntry: (path, callback) => {
      var stat, node;
      try {
        var lookup = FS.lookupPath(path);
        node = lookup.node;
        stat = FS.stat(path);
      } catch (e) {
        return callback(e);
      }
      if (FS.isDir(stat.mode)) {
        return callback(null, { "timestamp": stat.mtime, "mode": stat.mode });
      } else if (FS.isFile(stat.mode)) {
        node.contents = MEMFS.getFileDataAsTypedArray(node);
        return callback(null, { "timestamp": stat.mtime, "mode": stat.mode, "contents": node.contents });
      } else {
        return callback(new Error("node type not supported"));
      }
    },
    storeLocalEntry: (path, entry, callback) => {
      try {
        if (FS.isDir(entry["mode"])) {
          FS.mkdirTree(path, entry["mode"]);
        } else if (FS.isFile(entry["mode"])) {
          FS.writeFile(path, entry["contents"], { canOwn: true });
        } else {
          return callback(new Error("node type not supported"));
        }
        FS.chmod(path, entry["mode"]);
        FS.utime(path, entry["timestamp"], entry["timestamp"]);
      } catch (e) {
        return callback(e);
      }
      callback(null);
    },
    removeLocalEntry: (path, callback) => {
      try {
        var stat = FS.stat(path);
        if (FS.isDir(stat.mode)) {
          FS.rmdir(path);
        } else if (FS.isFile(stat.mode)) {
          FS.unlink(path);
        }
      } catch (e) {
        return callback(e);
      }
      callback(null);
    },
    loadRemoteEntry: (store, path, callback) => {
      var req = store.get(path);
      req.onsuccess = (event) => callback(null, event.target.result);
      req.onerror = (e) => {
        callback(e.target.error);
        e.preventDefault();
      };
    },
    storeRemoteEntry: (store, path, entry, callback) => {
      try {
        var req = store.put(entry, path);
      } catch (e) {
        callback(e);
        return;
      }
      req.onsuccess = (event) => callback();
      req.onerror = (e) => {
        callback(e.target.error);
        e.preventDefault();
      };
    },
    removeRemoteEntry: (store, path, callback) => {
      var req = store.delete(path);
      req.onsuccess = (event) => callback();
      req.onerror = (e) => {
        callback(e.target.error);
        e.preventDefault();
      };
    },
    reconcile: (src, dst, callback) => {
      var total = 0;
      var create = [];
      for (var [key, e] of Object.entries(src.entries)) {
        var e2 = dst.entries[key];
        if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
          create.push(key);
          total++;
        }
      }
      var remove = [];
      for (var key of Object.keys(dst.entries)) {
        if (!src.entries[key]) {
          remove.push(key);
          total++;
        }
      }
      if (!total) {
        return callback(null);
      }
      var errored = false;
      var db = src.type === "remote" ? src.db : dst.db;
      var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
      var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
      function done(err2) {
        if (err2 && !errored) {
          errored = true;
          return callback(err2);
        }
      }
      ;
      transaction.onerror = transaction.onabort = (e3) => {
        done(e3.target.error);
        e3.preventDefault();
      };
      transaction.oncomplete = (e3) => {
        if (!errored) {
          callback(null);
        }
      };
      for (const path2 of create.sort()) {
        if (dst.type === "local") {
          IDBFS.loadRemoteEntry(store, path2, (err2, entry) => {
            if (err2) return done(err2);
            IDBFS.storeLocalEntry(path2, entry, done);
          });
        } else {
          IDBFS.loadLocalEntry(path2, (err2, entry) => {
            if (err2) return done(err2);
            IDBFS.storeRemoteEntry(store, path2, entry, done);
          });
        }
      }
      for (var path of remove.sort().reverse()) {
        if (dst.type === "local") {
          IDBFS.removeLocalEntry(path, done);
        } else {
          IDBFS.removeRemoteEntry(store, path, done);
        }
      }
    }
  };
  var UTF8ToString = (ptr2, maxBytesToRead, ignoreNul) => {
    assert(typeof ptr2 == "number", `UTF8ToString expects a number (got ${typeof ptr2})`);
    return ptr2 ? UTF8ArrayToString(HEAPU8, ptr2, maxBytesToRead, ignoreNul) : "";
  };
  var strError = (errno) => UTF8ToString(_strerror(errno));
  var ERRNO_CODES = {
    "EPERM": 63,
    "ENOENT": 44,
    "ESRCH": 71,
    "EINTR": 27,
    "EIO": 29,
    "ENXIO": 60,
    "E2BIG": 1,
    "ENOEXEC": 45,
    "EBADF": 8,
    "ECHILD": 12,
    "EAGAIN": 6,
    "EWOULDBLOCK": 6,
    "ENOMEM": 48,
    "EACCES": 2,
    "EFAULT": 21,
    "ENOTBLK": 105,
    "EBUSY": 10,
    "EEXIST": 20,
    "EXDEV": 75,
    "ENODEV": 43,
    "ENOTDIR": 54,
    "EISDIR": 31,
    "EINVAL": 28,
    "ENFILE": 41,
    "EMFILE": 33,
    "ENOTTY": 59,
    "ETXTBSY": 74,
    "EFBIG": 22,
    "ENOSPC": 51,
    "ESPIPE": 70,
    "EROFS": 69,
    "EMLINK": 34,
    "EPIPE": 64,
    "EDOM": 18,
    "ERANGE": 68,
    "ENOMSG": 49,
    "EIDRM": 24,
    "ECHRNG": 106,
    "EL2NSYNC": 156,
    "EL3HLT": 107,
    "EL3RST": 108,
    "ELNRNG": 109,
    "EUNATCH": 110,
    "ENOCSI": 111,
    "EL2HLT": 112,
    "EDEADLK": 16,
    "ENOLCK": 46,
    "EBADE": 113,
    "EBADR": 114,
    "EXFULL": 115,
    "ENOANO": 104,
    "EBADRQC": 103,
    "EBADSLT": 102,
    "EDEADLOCK": 16,
    "EBFONT": 101,
    "ENOSTR": 100,
    "ENODATA": 116,
    "ETIME": 117,
    "ENOSR": 118,
    "ENONET": 119,
    "ENOPKG": 120,
    "EREMOTE": 121,
    "ENOLINK": 47,
    "EADV": 122,
    "ESRMNT": 123,
    "ECOMM": 124,
    "EPROTO": 65,
    "EMULTIHOP": 36,
    "EDOTDOT": 125,
    "EBADMSG": 9,
    "ENOTUNIQ": 126,
    "EBADFD": 127,
    "EREMCHG": 128,
    "ELIBACC": 129,
    "ELIBBAD": 130,
    "ELIBSCN": 131,
    "ELIBMAX": 132,
    "ELIBEXEC": 133,
    "ENOSYS": 52,
    "ENOTEMPTY": 55,
    "ENAMETOOLONG": 37,
    "ELOOP": 32,
    "EOPNOTSUPP": 138,
    "EPFNOSUPPORT": 139,
    "ECONNRESET": 15,
    "ENOBUFS": 42,
    "EAFNOSUPPORT": 5,
    "EPROTOTYPE": 67,
    "ENOTSOCK": 57,
    "ENOPROTOOPT": 50,
    "ESHUTDOWN": 140,
    "ECONNREFUSED": 14,
    "EADDRINUSE": 3,
    "ECONNABORTED": 13,
    "ENETUNREACH": 40,
    "ENETDOWN": 38,
    "ETIMEDOUT": 73,
    "EHOSTDOWN": 142,
    "EHOSTUNREACH": 23,
    "EINPROGRESS": 26,
    "EALREADY": 7,
    "EDESTADDRREQ": 17,
    "EMSGSIZE": 35,
    "EPROTONOSUPPORT": 66,
    "ESOCKTNOSUPPORT": 137,
    "EADDRNOTAVAIL": 4,
    "ENETRESET": 39,
    "EISCONN": 30,
    "ENOTCONN": 53,
    "ETOOMANYREFS": 141,
    "EUSERS": 136,
    "EDQUOT": 19,
    "ESTALE": 72,
    "ENOTSUP": 138,
    "ENOMEDIUM": 148,
    "EILSEQ": 25,
    "EOVERFLOW": 61,
    "ECANCELED": 11,
    "ENOTRECOVERABLE": 56,
    "EOWNERDEAD": 62,
    "ESTRPIPE": 135
  };
  var asyncLoad = async (url) => {
    var arrayBuffer = await readAsync(url);
    assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
    return new Uint8Array(arrayBuffer);
  };
  var FS_createDataFile = (...args) => FS.createDataFile(...args);
  var getUniqueRunDependency = (id) => {
    var orig = id;
    while (1) {
      if (!runDependencyTracking[id]) return id;
      id = orig + Math.random();
    }
  };
  var runDependencies = 0;
  var dependenciesFulfilled = null;
  var runDependencyTracking = {};
  var runDependencyWatcher = null;
  var removeRunDependency = (id) => {
    runDependencies--;
    Module["monitorRunDependencies"]?.(runDependencies);
    assert(id, "removeRunDependency requires an ID");
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  };
  var addRunDependency = (id) => {
    runDependencies++;
    Module["monitorRunDependencies"]?.(runDependencies);
    assert(id, "addRunDependency requires an ID");
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && globalThis.setInterval) {
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err("still waiting on run dependencies:");
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err("(end of list)");
        }
      }, 1e4);
    }
  };
  var preloadPlugins = [];
  var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
    if (typeof Browser != "undefined") Browser.init();
    for (var plugin of preloadPlugins) {
      if (plugin["canHandle"](fullname)) {
        assert(plugin["handle"].constructor.name === "AsyncFunction", "Filesystem plugin handlers must be async functions (See #24914)");
        return plugin["handle"](byteArray, fullname);
      }
    }
    return byteArray;
  };
  var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency(`cp ${fullname}`);
    addRunDependency(dep);
    try {
      var byteArray = url;
      if (typeof url == "string") {
        byteArray = await asyncLoad(url);
      }
      byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
      preFinish?.();
      if (!dontCreateFile) {
        FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
      }
    } finally {
      removeRunDependency(dep);
    }
  };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
    FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
  };
  var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: "/",
    initialized: false,
    ignorePermissions: true,
    filesystems: null,
    syncFSRequests: 0,
    ErrnoError: class extends Error {
      name = "ErrnoError";
      // We set the `name` property to be able to identify `FS.ErrnoError`
      // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
      // - when using PROXYFS, an error can come from an underlying FS
      // as different FS objects have their own FS.ErrnoError each,
      // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
      // we'll use the reliable test `err.name == "ErrnoError"` instead
      constructor(errno) {
        super(runtimeInitialized ? strError(errno) : "");
        this.errno = errno;
        for (var key in ERRNO_CODES) {
          if (ERRNO_CODES[key] === errno) {
            this.code = key;
            break;
          }
        }
      }
    },
    FSStream: class {
      shared = {};
      get object() {
        return this.node;
      }
      set object(val) {
        this.node = val;
      }
      get isRead() {
        return (this.flags & 2097155) !== 1;
      }
      get isWrite() {
        return (this.flags & 2097155) !== 0;
      }
      get isAppend() {
        return this.flags & 1024;
      }
      get flags() {
        return this.shared.flags;
      }
      set flags(val) {
        this.shared.flags = val;
      }
      get position() {
        return this.shared.position;
      }
      set position(val) {
        this.shared.position = val;
      }
    },
    FSNode: class {
      node_ops = {};
      stream_ops = {};
      readMode = 292 | 73;
      writeMode = 146;
      mounted = null;
      constructor(parent, name, mode, rdev) {
        if (!parent) {
          parent = this;
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.rdev = rdev;
        this.atime = this.mtime = this.ctime = Date.now();
      }
      get read() {
        return (this.mode & this.readMode) === this.readMode;
      }
      set read(val) {
        val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
      }
      get write() {
        return (this.mode & this.writeMode) === this.writeMode;
      }
      set write(val) {
        val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
      }
      get isFolder() {
        return FS.isDir(this.mode);
      }
      get isDevice() {
        return FS.isChrdev(this.mode);
      }
    },
    lookupPath(path, opts = {}) {
      if (!path) {
        throw new FS.ErrnoError(44);
      }
      opts.follow_mount ??= true;
      if (!PATH.isAbs(path)) {
        path = FS.cwd() + "/" + path;
      }
      linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
        var parts = path.split("/").filter((p) => !!p);
        var current = FS.root;
        var current_path = "/";
        for (var i2 = 0; i2 < parts.length; i2++) {
          var islast = i2 === parts.length - 1;
          if (islast && opts.parent) {
            break;
          }
          if (parts[i2] === ".") {
            continue;
          }
          if (parts[i2] === "..") {
            current_path = PATH.dirname(current_path);
            if (FS.isRoot(current)) {
              path = current_path + "/" + parts.slice(i2 + 1).join("/");
              nlinks--;
              continue linkloop;
            } else {
              current = current.parent;
            }
            continue;
          }
          current_path = PATH.join2(current_path, parts[i2]);
          try {
            current = FS.lookupNode(current, parts[i2]);
          } catch (e) {
            if (e?.errno === 44 && islast && opts.noent_okay) {
              return { path: current_path };
            }
            throw e;
          }
          if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
            current = current.mounted.root;
          }
          if (FS.isLink(current.mode) && (!islast || opts.follow)) {
            if (!current.node_ops.readlink) {
              throw new FS.ErrnoError(52);
            }
            var link = current.node_ops.readlink(current);
            if (!PATH.isAbs(link)) {
              link = PATH.dirname(current_path) + "/" + link;
            }
            path = link + "/" + parts.slice(i2 + 1).join("/");
            continue linkloop;
          }
        }
        return { path: current_path, node: current };
      }
      throw new FS.ErrnoError(32);
    },
    getPath(node) {
      var path;
      while (true) {
        if (FS.isRoot(node)) {
          var mount = node.mount.mountpoint;
          if (!path) return mount;
          return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
        }
        path = path ? `${node.name}/${path}` : node.name;
        node = node.parent;
      }
    },
    hashName(parentid, name) {
      var hash = 0;
      for (var i2 = 0; i2 < name.length; i2++) {
        hash = (hash << 5) - hash + name.charCodeAt(i2) | 0;
      }
      return (parentid + hash >>> 0) % FS.nameTable.length;
    },
    hashAddNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      node.name_next = FS.nameTable[hash];
      FS.nameTable[hash] = node;
    },
    hashRemoveNode(node) {
      var hash = FS.hashName(node.parent.id, node.name);
      if (FS.nameTable[hash] === node) {
        FS.nameTable[hash] = node.name_next;
      } else {
        var current = FS.nameTable[hash];
        while (current) {
          if (current.name_next === node) {
            current.name_next = node.name_next;
            break;
          }
          current = current.name_next;
        }
      }
    },
    lookupNode(parent, name) {
      var errCode = FS.mayLookup(parent);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      var hash = FS.hashName(parent.id, name);
      for (var node = FS.nameTable[hash]; node; node = node.name_next) {
        var nodeName = node.name;
        if (node.parent.id === parent.id && nodeName === name) {
          return node;
        }
      }
      return FS.lookup(parent, name);
    },
    createNode(parent, name, mode, rdev) {
      assert(typeof parent == "object");
      var node = new FS.FSNode(parent, name, mode, rdev);
      FS.hashAddNode(node);
      return node;
    },
    destroyNode(node) {
      FS.hashRemoveNode(node);
    },
    isRoot(node) {
      return node === node.parent;
    },
    isMountpoint(node) {
      return !!node.mounted;
    },
    isFile(mode) {
      return (mode & 61440) === 32768;
    },
    isDir(mode) {
      return (mode & 61440) === 16384;
    },
    isLink(mode) {
      return (mode & 61440) === 40960;
    },
    isChrdev(mode) {
      return (mode & 61440) === 8192;
    },
    isBlkdev(mode) {
      return (mode & 61440) === 24576;
    },
    isFIFO(mode) {
      return (mode & 61440) === 4096;
    },
    isSocket(mode) {
      return (mode & 49152) === 49152;
    },
    flagsToPermissionString(flag) {
      var perms = ["r", "w", "rw"][flag & 3];
      if (flag & 512) {
        perms += "w";
      }
      return perms;
    },
    nodePermissions(node, perms) {
      if (FS.ignorePermissions) {
        return 0;
      }
      if (perms.includes("r") && !(node.mode & 292)) {
        return 2;
      }
      if (perms.includes("w") && !(node.mode & 146)) {
        return 2;
      }
      if (perms.includes("x") && !(node.mode & 73)) {
        return 2;
      }
      return 0;
    },
    mayLookup(dir) {
      if (!FS.isDir(dir.mode)) return 54;
      var errCode = FS.nodePermissions(dir, "x");
      if (errCode) return errCode;
      if (!dir.node_ops.lookup) return 2;
      return 0;
    },
    mayCreate(dir, name) {
      if (!FS.isDir(dir.mode)) {
        return 54;
      }
      try {
        var node = FS.lookupNode(dir, name);
        return 20;
      } catch (e) {
      }
      return FS.nodePermissions(dir, "wx");
    },
    mayDelete(dir, name, isdir) {
      var node;
      try {
        node = FS.lookupNode(dir, name);
      } catch (e) {
        return e.errno;
      }
      var errCode = FS.nodePermissions(dir, "wx");
      if (errCode) {
        return errCode;
      }
      if (isdir) {
        if (!FS.isDir(node.mode)) {
          return 54;
        }
        if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
          return 10;
        }
      } else if (FS.isDir(node.mode)) {
        return 31;
      }
      return 0;
    },
    mayOpen(node, flags) {
      if (!node) {
        return 44;
      }
      if (FS.isLink(node.mode)) {
        return 32;
      }
      var mode = FS.flagsToPermissionString(flags);
      if (FS.isDir(node.mode)) {
        if (mode !== "r" || flags & (512 | 64)) {
          return 31;
        }
      }
      return FS.nodePermissions(node, mode);
    },
    checkOpExists(op, err2) {
      if (!op) {
        throw new FS.ErrnoError(err2);
      }
      return op;
    },
    MAX_OPEN_FDS: 4096,
    nextfd() {
      for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
        if (!FS.streams[fd]) {
          return fd;
        }
      }
      throw new FS.ErrnoError(33);
    },
    getStreamChecked(fd) {
      var stream = FS.getStream(fd);
      if (!stream) {
        throw new FS.ErrnoError(8);
      }
      return stream;
    },
    getStream: (fd) => FS.streams[fd],
    createStream(stream, fd = -1) {
      assert(fd >= -1);
      stream = Object.assign(new FS.FSStream(), stream);
      if (fd == -1) {
        fd = FS.nextfd();
      }
      stream.fd = fd;
      FS.streams[fd] = stream;
      return stream;
    },
    closeStream(fd) {
      FS.streams[fd] = null;
    },
    dupStream(origStream, fd = -1) {
      var stream = FS.createStream(origStream, fd);
      stream.stream_ops?.dup?.(stream);
      return stream;
    },
    doSetAttr(stream, node, attr) {
      var setattr = stream?.stream_ops.setattr;
      var arg = setattr ? stream : node;
      setattr ??= node.node_ops.setattr;
      FS.checkOpExists(setattr, 63);
      setattr(arg, attr);
    },
    chrdev_stream_ops: {
      open(stream) {
        var device = FS.getDevice(stream.node.rdev);
        stream.stream_ops = device.stream_ops;
        stream.stream_ops.open?.(stream);
      },
      llseek() {
        throw new FS.ErrnoError(70);
      }
    },
    major: (dev) => dev >> 8,
    minor: (dev) => dev & 255,
    makedev: (ma, mi) => ma << 8 | mi,
    registerDevice(dev, ops) {
      FS.devices[dev] = { stream_ops: ops };
    },
    getDevice: (dev) => FS.devices[dev],
    getMounts(mount) {
      var mounts = [];
      var check = [mount];
      while (check.length) {
        var m = check.pop();
        mounts.push(m);
        check.push(...m.mounts);
      }
      return mounts;
    },
    syncfs(populate, callback) {
      if (typeof populate == "function") {
        callback = populate;
        populate = false;
      }
      FS.syncFSRequests++;
      if (FS.syncFSRequests > 1) {
        err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
      }
      var mounts = FS.getMounts(FS.root.mount);
      var completed = 0;
      function doCallback(errCode) {
        assert(FS.syncFSRequests > 0);
        FS.syncFSRequests--;
        return callback(errCode);
      }
      function done(errCode) {
        if (errCode) {
          if (!done.errored) {
            done.errored = true;
            return doCallback(errCode);
          }
          return;
        }
        if (++completed >= mounts.length) {
          doCallback(null);
        }
      }
      ;
      for (var mount of mounts) {
        if (mount.type.syncfs) {
          mount.type.syncfs(mount, populate, done);
        } else {
          done(null);
        }
      }
    },
    mount(type, opts, mountpoint) {
      if (typeof type == "string") {
        throw type;
      }
      var root = mountpoint === "/";
      var pseudo = !mountpoint;
      var node;
      if (root && FS.root) {
        throw new FS.ErrnoError(10);
      } else if (!root && !pseudo) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
        mountpoint = lookup.path;
        node = lookup.node;
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        if (!FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
      }
      var mount = {
        type,
        opts,
        mountpoint,
        mounts: []
      };
      var mountRoot = type.mount(mount);
      mountRoot.mount = mount;
      mount.root = mountRoot;
      if (root) {
        FS.root = mountRoot;
      } else if (node) {
        node.mounted = mount;
        if (node.mount) {
          node.mount.mounts.push(mount);
        }
      }
      return mountRoot;
    },
    unmount(mountpoint) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      if (!FS.isMountpoint(lookup.node)) {
        throw new FS.ErrnoError(28);
      }
      var node = lookup.node;
      var mount = node.mounted;
      var mounts = FS.getMounts(mount);
      for (var [hash, current] of Object.entries(FS.nameTable)) {
        while (current) {
          var next = current.name_next;
          if (mounts.includes(current.mount)) {
            FS.destroyNode(current);
          }
          current = next;
        }
      }
      node.mounted = null;
      var idx = node.mount.mounts.indexOf(mount);
      assert(idx !== -1);
      node.mount.mounts.splice(idx, 1);
    },
    lookup(parent, name) {
      return parent.node_ops.lookup(parent, name);
    },
    mknod(path, mode, dev) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      if (!name) {
        throw new FS.ErrnoError(28);
      }
      if (name === "." || name === "..") {
        throw new FS.ErrnoError(20);
      }
      var errCode = FS.mayCreate(parent, name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.mknod) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.mknod(parent, name, mode, dev);
    },
    statfs(path) {
      return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
    },
    statfsStream(stream) {
      return FS.statfsNode(stream.node);
    },
    statfsNode(node) {
      var rtn = {
        bsize: 4096,
        frsize: 4096,
        blocks: 1e6,
        bfree: 5e5,
        bavail: 5e5,
        files: FS.nextInode,
        ffree: FS.nextInode - 1,
        fsid: 42,
        flags: 2,
        namelen: 255
      };
      if (node.node_ops.statfs) {
        Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
      }
      return rtn;
    },
    create(path, mode = 438) {
      mode &= 4095;
      mode |= 32768;
      return FS.mknod(path, mode, 0);
    },
    mkdir(path, mode = 511) {
      mode &= 511 | 512;
      mode |= 16384;
      return FS.mknod(path, mode, 0);
    },
    mkdirTree(path, mode) {
      var dirs = path.split("/");
      var d = "";
      for (var dir of dirs) {
        if (!dir) continue;
        if (d || PATH.isAbs(path)) d += "/";
        d += dir;
        try {
          FS.mkdir(d, mode);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
      }
    },
    mkdev(path, mode, dev) {
      if (typeof dev == "undefined") {
        dev = mode;
        mode = 438;
      }
      mode |= 8192;
      return FS.mknod(path, mode, dev);
    },
    symlink(oldpath, newpath) {
      if (!PATH_FS.resolve(oldpath)) {
        throw new FS.ErrnoError(44);
      }
      var lookup = FS.lookupPath(newpath, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var newname = PATH.basename(newpath);
      var errCode = FS.mayCreate(parent, newname);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.symlink) {
        throw new FS.ErrnoError(63);
      }
      return parent.node_ops.symlink(parent, newname, oldpath);
    },
    rename(old_path, new_path) {
      var old_dirname = PATH.dirname(old_path);
      var new_dirname = PATH.dirname(new_path);
      var old_name = PATH.basename(old_path);
      var new_name = PATH.basename(new_path);
      var lookup, old_dir, new_dir;
      lookup = FS.lookupPath(old_path, { parent: true });
      old_dir = lookup.node;
      lookup = FS.lookupPath(new_path, { parent: true });
      new_dir = lookup.node;
      if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
      if (old_dir.mount !== new_dir.mount) {
        throw new FS.ErrnoError(75);
      }
      var old_node = FS.lookupNode(old_dir, old_name);
      var relative = PATH_FS.relative(old_path, new_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(28);
      }
      relative = PATH_FS.relative(new_path, old_dirname);
      if (relative.charAt(0) !== ".") {
        throw new FS.ErrnoError(55);
      }
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {
      }
      if (old_node === new_node) {
        return;
      }
      var isdir = FS.isDir(old_node.mode);
      var errCode = FS.mayDelete(old_dir, old_name, isdir);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!old_dir.node_ops.rename) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
        throw new FS.ErrnoError(10);
      }
      if (new_dir !== old_dir) {
        errCode = FS.nodePermissions(old_dir, "w");
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      FS.hashRemoveNode(old_node);
      try {
        old_dir.node_ops.rename(old_node, new_dir, new_name);
        old_node.parent = new_dir;
      } catch (e) {
        throw e;
      } finally {
        FS.hashAddNode(old_node);
      }
    },
    rmdir(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, true);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.rmdir) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.rmdir(parent, name);
      FS.destroyNode(node);
    },
    readdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
      return readdir(node);
    },
    unlink(path) {
      var lookup = FS.lookupPath(path, { parent: true });
      var parent = lookup.node;
      if (!parent) {
        throw new FS.ErrnoError(44);
      }
      var name = PATH.basename(path);
      var node = FS.lookupNode(parent, name);
      var errCode = FS.mayDelete(parent, name, false);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      if (!parent.node_ops.unlink) {
        throw new FS.ErrnoError(63);
      }
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      parent.node_ops.unlink(parent, name);
      FS.destroyNode(node);
    },
    readlink(path) {
      var lookup = FS.lookupPath(path);
      var link = lookup.node;
      if (!link) {
        throw new FS.ErrnoError(44);
      }
      if (!link.node_ops.readlink) {
        throw new FS.ErrnoError(28);
      }
      return link.node_ops.readlink(link);
    },
    stat(path, dontFollow) {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      var node = lookup.node;
      var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
      return getattr(node);
    },
    fstat(fd) {
      var stream = FS.getStreamChecked(fd);
      var node = stream.node;
      var getattr = stream.stream_ops.getattr;
      var arg = getattr ? stream : node;
      getattr ??= node.node_ops.getattr;
      FS.checkOpExists(getattr, 63);
      return getattr(arg);
    },
    lstat(path) {
      return FS.stat(path, true);
    },
    doChmod(stream, node, mode, dontFollow) {
      FS.doSetAttr(stream, node, {
        mode: mode & 4095 | node.mode & ~4095,
        ctime: Date.now(),
        dontFollow
      });
    },
    chmod(path, mode, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChmod(null, node, mode, dontFollow);
    },
    lchmod(path, mode) {
      FS.chmod(path, mode, true);
    },
    fchmod(fd, mode) {
      var stream = FS.getStreamChecked(fd);
      FS.doChmod(stream, stream.node, mode, false);
    },
    doChown(stream, node, dontFollow) {
      FS.doSetAttr(stream, node, {
        timestamp: Date.now(),
        dontFollow
        // we ignore the uid / gid for now
      });
    },
    chown(path, uid, gid, dontFollow) {
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doChown(null, node, dontFollow);
    },
    lchown(path, uid, gid) {
      FS.chown(path, uid, gid, true);
    },
    fchown(fd, uid, gid) {
      var stream = FS.getStreamChecked(fd);
      FS.doChown(stream, stream.node, false);
    },
    doTruncate(stream, node, len) {
      if (FS.isDir(node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!FS.isFile(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      var errCode = FS.nodePermissions(node, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.doSetAttr(stream, node, {
        size: len,
        timestamp: Date.now()
      });
    },
    truncate(path, len) {
      if (len < 0) {
        throw new FS.ErrnoError(28);
      }
      var node;
      if (typeof path == "string") {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } else {
        node = path;
      }
      FS.doTruncate(null, node, len);
    },
    ftruncate(fd, len) {
      var stream = FS.getStreamChecked(fd);
      if (len < 0 || (stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(28);
      }
      FS.doTruncate(stream, stream.node, len);
    },
    utime(path, atime, mtime) {
      var lookup = FS.lookupPath(path, { follow: true });
      var node = lookup.node;
      var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
      setattr(node, {
        atime,
        mtime
      });
    },
    open(path, flags, mode = 438) {
      if (path === "") {
        throw new FS.ErrnoError(44);
      }
      flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
      if (flags & 64) {
        mode = mode & 4095 | 32768;
      } else {
        mode = 0;
      }
      var node;
      var isDirPath;
      if (typeof path == "object") {
        node = path;
      } else {
        isDirPath = path.endsWith("/");
        var lookup = FS.lookupPath(path, {
          follow: !(flags & 131072),
          noent_okay: true
        });
        node = lookup.node;
        path = lookup.path;
      }
      var created = false;
      if (flags & 64) {
        if (node) {
          if (flags & 128) {
            throw new FS.ErrnoError(20);
          }
        } else if (isDirPath) {
          throw new FS.ErrnoError(31);
        } else {
          node = FS.mknod(path, mode | 511, 0);
          created = true;
        }
      }
      if (!node) {
        throw new FS.ErrnoError(44);
      }
      if (FS.isChrdev(node.mode)) {
        flags &= ~512;
      }
      if (flags & 65536 && !FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
      if (!created) {
        var errCode = FS.mayOpen(node, flags);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
      }
      if (flags & 512 && !created) {
        FS.truncate(node, 0);
      }
      flags &= ~(128 | 512 | 131072);
      var stream = FS.createStream({
        node,
        path: FS.getPath(node),
        // we want the absolute path to the node
        flags,
        seekable: true,
        position: 0,
        stream_ops: node.stream_ops,
        // used by the file family libc calls (fopen, fwrite, ferror, etc.)
        ungotten: [],
        error: false
      });
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream);
      }
      if (created) {
        FS.chmod(node, mode & 511);
      }
      return stream;
    },
    close(stream) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (stream.getdents) stream.getdents = null;
      try {
        if (stream.stream_ops.close) {
          stream.stream_ops.close(stream);
        }
      } catch (e) {
        throw e;
      } finally {
        FS.closeStream(stream.fd);
      }
      stream.fd = null;
    },
    isClosed(stream) {
      return stream.fd === null;
    },
    llseek(stream, offset, whence) {
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if (!stream.seekable || !stream.stream_ops.llseek) {
        throw new FS.ErrnoError(70);
      }
      if (whence != 0 && whence != 1 && whence != 2) {
        throw new FS.ErrnoError(28);
      }
      stream.position = stream.stream_ops.llseek(stream, offset, whence);
      stream.ungotten = [];
      return stream.position;
    },
    read(stream, buffer, offset, length, position) {
      assert(offset >= 0);
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.read) {
        throw new FS.ErrnoError(28);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
      if (!seeking) stream.position += bytesRead;
      return bytesRead;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      assert(offset >= 0);
      if (length < 0 || position < 0) {
        throw new FS.ErrnoError(28);
      }
      if (FS.isClosed(stream)) {
        throw new FS.ErrnoError(8);
      }
      if ((stream.flags & 2097155) === 0) {
        throw new FS.ErrnoError(8);
      }
      if (FS.isDir(stream.node.mode)) {
        throw new FS.ErrnoError(31);
      }
      if (!stream.stream_ops.write) {
        throw new FS.ErrnoError(28);
      }
      if (stream.seekable && stream.flags & 1024) {
        FS.llseek(stream, 0, 2);
      }
      var seeking = typeof position != "undefined";
      if (!seeking) {
        position = stream.position;
      } else if (!stream.seekable) {
        throw new FS.ErrnoError(70);
      }
      var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
      if (!seeking) stream.position += bytesWritten;
      return bytesWritten;
    },
    mmap(stream, length, position, prot, flags) {
      if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
        throw new FS.ErrnoError(2);
      }
      if ((stream.flags & 2097155) === 1) {
        throw new FS.ErrnoError(2);
      }
      if (!stream.stream_ops.mmap) {
        throw new FS.ErrnoError(43);
      }
      if (!length) {
        throw new FS.ErrnoError(28);
      }
      return stream.stream_ops.mmap(stream, length, position, prot, flags);
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      assert(offset >= 0);
      if (!stream.stream_ops.msync) {
        return 0;
      }
      return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
    },
    ioctl(stream, cmd, arg) {
      if (!stream.stream_ops.ioctl) {
        throw new FS.ErrnoError(59);
      }
      return stream.stream_ops.ioctl(stream, cmd, arg);
    },
    readFile(path, opts = {}) {
      opts.flags = opts.flags || 0;
      opts.encoding = opts.encoding || "binary";
      if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
        abort(`Invalid encoding type "${opts.encoding}"`);
      }
      var stream = FS.open(path, opts.flags);
      var stat = FS.stat(path);
      var length = stat.size;
      var buf = new Uint8Array(length);
      FS.read(stream, buf, 0, length, 0);
      if (opts.encoding === "utf8") {
        buf = UTF8ArrayToString(buf);
      }
      FS.close(stream);
      return buf;
    },
    writeFile(path, data, opts = {}) {
      opts.flags = opts.flags || 577;
      var stream = FS.open(path, opts.flags, opts.mode);
      if (typeof data == "string") {
        data = new Uint8Array(intArrayFromString(data, true));
      }
      if (ArrayBuffer.isView(data)) {
        FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
      } else {
        abort("Unsupported data type");
      }
      FS.close(stream);
    },
    cwd: () => FS.currentPath,
    chdir(path) {
      var lookup = FS.lookupPath(path, { follow: true });
      if (lookup.node === null) {
        throw new FS.ErrnoError(44);
      }
      if (!FS.isDir(lookup.node.mode)) {
        throw new FS.ErrnoError(54);
      }
      var errCode = FS.nodePermissions(lookup.node, "x");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
      FS.currentPath = lookup.path;
    },
    createDefaultDirectories() {
      FS.mkdir("/tmp");
      FS.mkdir("/home");
      FS.mkdir("/home/web_user");
    },
    createDefaultDevices() {
      FS.mkdir("/dev");
      FS.registerDevice(FS.makedev(1, 3), {
        read: () => 0,
        write: (stream, buffer, offset, length, pos) => length,
        llseek: () => 0
      });
      FS.mkdev("/dev/null", FS.makedev(1, 3));
      TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
      TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
      FS.mkdev("/dev/tty", FS.makedev(5, 0));
      FS.mkdev("/dev/tty1", FS.makedev(6, 0));
      var randomBuffer = new Uint8Array(1024), randomLeft = 0;
      var randomByte = () => {
        if (randomLeft === 0) {
          randomFill(randomBuffer);
          randomLeft = randomBuffer.byteLength;
        }
        return randomBuffer[--randomLeft];
      };
      FS.createDevice("/dev", "random", randomByte);
      FS.createDevice("/dev", "urandom", randomByte);
      FS.mkdir("/dev/shm");
      FS.mkdir("/dev/shm/tmp");
    },
    createSpecialDirectories() {
      FS.mkdir("/proc");
      var proc_self = FS.mkdir("/proc/self");
      FS.mkdir("/proc/self/fd");
      FS.mount({
        mount() {
          var node = FS.createNode(proc_self, "fd", 16895, 73);
          node.stream_ops = {
            llseek: MEMFS.stream_ops.llseek
          };
          node.node_ops = {
            lookup(parent, name) {
              var fd = +name;
              var stream = FS.getStreamChecked(fd);
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: { readlink: () => stream.path },
                id: fd + 1
              };
              ret.parent = ret;
              return ret;
            },
            readdir() {
              return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
            }
          };
          return node;
        }
      }, {}, "/proc/self/fd");
    },
    createStandardStreams(input, output, error) {
      if (input) {
        FS.createDevice("/dev", "stdin", input);
      } else {
        FS.symlink("/dev/tty", "/dev/stdin");
      }
      if (output) {
        FS.createDevice("/dev", "stdout", null, output);
      } else {
        FS.symlink("/dev/tty", "/dev/stdout");
      }
      if (error) {
        FS.createDevice("/dev", "stderr", null, error);
      } else {
        FS.symlink("/dev/tty1", "/dev/stderr");
      }
      var stdin = FS.open("/dev/stdin", 0);
      var stdout = FS.open("/dev/stdout", 1);
      var stderr = FS.open("/dev/stderr", 1);
      assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
      assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
      assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
    },
    staticInit() {
      FS.nameTable = new Array(4096);
      FS.mount(MEMFS, {}, "/");
      FS.createDefaultDirectories();
      FS.createDefaultDevices();
      FS.createSpecialDirectories();
      FS.filesystems = {
        "MEMFS": MEMFS,
        "IDBFS": IDBFS
      };
    },
    init(input, output, error) {
      assert(!FS.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
      FS.initialized = true;
      input ??= Module["stdin"];
      output ??= Module["stdout"];
      error ??= Module["stderr"];
      FS.createStandardStreams(input, output, error);
    },
    quit() {
      FS.initialized = false;
      _fflush(0);
      for (var stream of FS.streams) {
        if (stream) {
          FS.close(stream);
        }
      }
    },
    findObject(path, dontResolveLastLink) {
      var ret = FS.analyzePath(path, dontResolveLastLink);
      if (!ret.exists) {
        return null;
      }
      return ret.object;
    },
    analyzePath(path, dontResolveLastLink) {
      try {
        var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        path = lookup.path;
      } catch (e) {
      }
      var ret = {
        isRoot: false,
        exists: false,
        error: 0,
        name: null,
        path: null,
        object: null,
        parentExists: false,
        parentPath: null,
        parentObject: null
      };
      try {
        var lookup = FS.lookupPath(path, { parent: true });
        ret.parentExists = true;
        ret.parentPath = lookup.path;
        ret.parentObject = lookup.node;
        ret.name = PATH.basename(path);
        lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
        ret.exists = true;
        ret.path = lookup.path;
        ret.object = lookup.node;
        ret.name = lookup.node.name;
        ret.isRoot = lookup.path === "/";
      } catch (e) {
        ret.error = e.errno;
      }
      ;
      return ret;
    },
    createPath(parent, path, canRead, canWrite) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      var parts = path.split("/").reverse();
      while (parts.length) {
        var part = parts.pop();
        if (!part) continue;
        var current = PATH.join2(parent, part);
        try {
          FS.mkdir(current);
        } catch (e) {
          if (e.errno != 20) throw e;
        }
        parent = current;
      }
      return current;
    },
    createFile(parent, name, properties, canRead, canWrite) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(canRead, canWrite);
      return FS.create(path, mode);
    },
    createDataFile(parent, name, data, canRead, canWrite, canOwn) {
      var path = name;
      if (parent) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        path = name ? PATH.join2(parent, name) : parent;
      }
      var mode = FS_getMode(canRead, canWrite);
      var node = FS.create(path, mode);
      if (data) {
        if (typeof data == "string") {
          var arr = new Array(data.length);
          for (var i2 = 0, len = data.length; i2 < len; ++i2) arr[i2] = data.charCodeAt(i2);
          data = arr;
        }
        FS.chmod(node, mode | 146);
        var stream = FS.open(node, 577);
        FS.write(stream, data, 0, data.length, 0, canOwn);
        FS.close(stream);
        FS.chmod(node, mode);
      }
    },
    createDevice(parent, name, input, output) {
      var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
      var mode = FS_getMode(!!input, !!output);
      FS.createDevice.major ??= 64;
      var dev = FS.makedev(FS.createDevice.major++, 0);
      FS.registerDevice(dev, {
        open(stream) {
          stream.seekable = false;
        },
        close(stream) {
          if (output?.buffer?.length) {
            output(10);
          }
        },
        read(stream, buffer, offset, length, pos) {
          var bytesRead = 0;
          for (var i2 = 0; i2 < length; i2++) {
            var result;
            try {
              result = input();
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0) break;
            bytesRead++;
            buffer[offset + i2] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        },
        write(stream, buffer, offset, length, pos) {
          for (var i2 = 0; i2 < length; i2++) {
            try {
              output(buffer[offset + i2]);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i2;
        }
      });
      return FS.mkdev(path, mode, dev);
    },
    forceLoadFile(obj) {
      if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
      if (globalThis.XMLHttpRequest) {
        abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      } else {
        try {
          obj.contents = readBinary(obj.url);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      }
    },
    createLazyFile(parent, name, url, canRead, canWrite) {
      class LazyUint8Array {
        lengthKnown = false;
        chunks = [];
        // Loaded chunks. Index is the chunk number
        get(idx) {
          if (idx > this.length - 1 || idx < 0) {
            return void 0;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = idx / this.chunkSize | 0;
          return this.getter(chunkNum)[chunkOffset];
        }
        setDataGetter(getter) {
          this.getter = getter;
        }
        cacheLength() {
          var xhr = new XMLHttpRequest();
          xhr.open("HEAD", url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
          var chunkSize = 1024 * 1024;
          if (!hasByteServing) chunkSize = datalength;
          var doXHR = (from, to) => {
            if (from > to) abort("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength - 1) abort("only " + datalength + " bytes available! programmer error!");
            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url, false);
            if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
            xhr2.responseType = "arraybuffer";
            if (xhr2.overrideMimeType) {
              xhr2.overrideMimeType("text/plain; charset=x-user-defined");
            }
            xhr2.send(null);
            if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr2.status);
            if (xhr2.response !== void 0) {
              return new Uint8Array(
                /** @type{Array<number>} */
                xhr2.response || []
              );
            }
            return intArrayFromString(xhr2.responseText || "", true);
          };
          var lazyArray2 = this;
          lazyArray2.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum + 1) * chunkSize - 1;
            end = Math.min(end, datalength - 1);
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
              lazyArray2.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray2.chunks[chunkNum] == "undefined") abort("doXHR failed!");
            return lazyArray2.chunks[chunkNum];
          });
          if (usesGzip || !datalength) {
            chunkSize = datalength = 1;
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        get length() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._length;
        }
        get chunkSize() {
          if (!this.lengthKnown) {
            this.cacheLength();
          }
          return this._chunkSize;
        }
      }
      if (globalThis.XMLHttpRequest) {
        if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
        var lazyArray = new LazyUint8Array();
        var properties = { isDevice: false, contents: lazyArray };
      } else {
        var properties = { isDevice: false, url };
      }
      var node = FS.createFile(parent, name, properties, canRead, canWrite);
      if (properties.contents) {
        node.contents = properties.contents;
      } else if (properties.url) {
        node.contents = null;
        node.url = properties.url;
      }
      Object.defineProperties(node, {
        usedBytes: {
          get: function() {
            return this.contents.length;
          }
        }
      });
      var stream_ops = {};
      for (const [key, fn] of Object.entries(node.stream_ops)) {
        stream_ops[key] = (...args) => {
          FS.forceLoadFile(node);
          return fn(...args);
        };
      }
      function writeChunks(stream, buffer, offset, length, position) {
        var contents = stream.node.contents;
        if (position >= contents.length)
          return 0;
        var size = Math.min(contents.length - position, length);
        assert(size >= 0);
        if (contents.slice) {
          for (var i2 = 0; i2 < size; i2++) {
            buffer[offset + i2] = contents[position + i2];
          }
        } else {
          for (var i2 = 0; i2 < size; i2++) {
            buffer[offset + i2] = contents.get(position + i2);
          }
        }
        return size;
      }
      stream_ops.read = (stream, buffer, offset, length, position) => {
        FS.forceLoadFile(node);
        return writeChunks(stream, buffer, offset, length, position);
      };
      stream_ops.mmap = (stream, length, position, prot, flags) => {
        FS.forceLoadFile(node);
        var ptr2 = mmapAlloc(length);
        if (!ptr2) {
          throw new FS.ErrnoError(48);
        }
        writeChunks(stream, HEAP8, ptr2, length, position);
        return { ptr: ptr2, allocated: true };
      };
      node.stream_ops = stream_ops;
      return node;
    },
    absolutePath() {
      abort("FS.absolutePath has been removed; use PATH_FS.resolve instead");
    },
    createFolder() {
      abort("FS.createFolder has been removed; use FS.mkdir instead");
    },
    createLink() {
      abort("FS.createLink has been removed; use FS.symlink instead");
    },
    joinPath() {
      abort("FS.joinPath has been removed; use PATH.join instead");
    },
    mmapAlloc() {
      abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
    },
    standardizePath() {
      abort("FS.standardizePath has been removed; use PATH.normalize instead");
    }
  };
  var SYSCALLS = {
    calculateAt(dirfd, path, allowEmpty) {
      if (PATH.isAbs(path)) {
        return path;
      }
      var dir;
      if (dirfd === -100) {
        dir = FS.cwd();
      } else {
        var dirstream = SYSCALLS.getStreamFromFD(dirfd);
        dir = dirstream.path;
      }
      if (path.length == 0) {
        if (!allowEmpty) {
          throw new FS.ErrnoError(44);
          ;
        }
        return dir;
      }
      return dir + "/" + path;
    },
    writeStat(buf, stat) {
      HEAPU32[buf >> 2] = stat.dev;
      HEAPU32[buf + 4 >> 2] = stat.mode;
      HEAPU32[buf + 8 >> 2] = stat.nlink;
      HEAPU32[buf + 12 >> 2] = stat.uid;
      HEAPU32[buf + 16 >> 2] = stat.gid;
      HEAPU32[buf + 20 >> 2] = stat.rdev;
      HEAP64[buf + 24 >> 3] = BigInt(stat.size);
      HEAP32[buf + 32 >> 2] = 4096;
      HEAP32[buf + 36 >> 2] = stat.blocks;
      var atime = stat.atime.getTime();
      var mtime = stat.mtime.getTime();
      var ctime = stat.ctime.getTime();
      HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
      HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
      HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
      HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
      HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
      return 0;
    },
    writeStatFs(buf, stats) {
      HEAPU32[buf + 4 >> 2] = stats.bsize;
      HEAPU32[buf + 60 >> 2] = stats.bsize;
      HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
      HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
      HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
      HEAP64[buf + 32 >> 3] = BigInt(stats.files);
      HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
      HEAPU32[buf + 48 >> 2] = stats.fsid;
      HEAPU32[buf + 64 >> 2] = stats.flags;
      HEAPU32[buf + 56 >> 2] = stats.namelen;
    },
    doMsync(addr, stream, len, flags, offset) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      if (flags & 2) {
        return 0;
      }
      var buffer = HEAPU8.slice(addr, addr + len);
      FS.msync(stream, buffer, offset, len, flags);
    },
    getStreamFromFD(fd) {
      var stream = FS.getStreamChecked(fd);
      return stream;
    },
    varargs: void 0,
    getStr(ptr2) {
      var ret = UTF8ToString(ptr2);
      return ret;
    }
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;
        // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          HEAP16[arg + offset >> 1] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0;
      }
      return -28;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_fstat64(fd, buf) {
    try {
      return SYSCALLS.writeStat(buf, FS.fstat(fd));
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  var INT53_MAX = 9007199254740992;
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
  function ___syscall_ftruncate64(fd, length) {
    length = bigintToI53Checked(length);
    try {
      if (isNaN(length)) return -61;
      FS.ftruncate(fd, length);
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
    ;
  }
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
    assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  };
  function ___syscall_getcwd(buf, size) {
    try {
      if (size === 0) return -28;
      var cwd = FS.cwd();
      var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
      if (size < cwdLengthInBytes) return -68;
      stringToUTF8(cwd, buf, size);
      return cwdLengthInBytes;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_ioctl(fd, op, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[argp >> 2] = termios.c_iflag || 0;
            HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
            HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
            HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
            for (var i2 = 0; i2 < 32; i2++) {
              HEAP8[argp + i2 + 17] = termios.c_cc[i2] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[argp >> 2];
            var c_oflag = HEAP32[argp + 4 >> 2];
            var c_cflag = HEAP32[argp + 8 >> 2];
            var c_lflag = HEAP32[argp + 12 >> 2];
            var c_cc = [];
            for (var i2 = 0; i2 < 32; i2++) {
              c_cc.push(HEAP8[argp + i2 + 17]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0;
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[argp >> 2] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28;
        }
        case 21537:
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[argp >> 1] = winsize[0];
            HEAP16[argp + 2 >> 1] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default:
          return -28;
      }
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_lstat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.lstat(path));
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_mkdirat(dirfd, path, mode) {
    try {
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      FS.mkdir(path, mode, 0);
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_newfstatat(dirfd, path, buf, flags) {
    try {
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & ~6400;
      assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_openat(dirfd, path, flags, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  function ___syscall_stat64(path, buf) {
    try {
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.stat(path));
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return -e.errno;
    }
  }
  var __abort_js = () => abort("native code called abort()");
  var runtimeKeepaliveCounter = 0;
  var __emscripten_runtime_keepalive_clear = () => {
    noExitRuntime = false;
    runtimeKeepaliveCounter = 0;
  };
  var __emscripten_throw_longjmp = () => {
    throw Infinity;
  };
  var _emscripten_get_now = () => performance.now();
  var _emscripten_date_now = () => Date.now();
  var nowIsMonotonic = 1;
  var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
  function _clock_time_get(clk_id, ignored_precision, ptime) {
    ignored_precision = bigintToI53Checked(ignored_precision);
    if (!checkWasiClock(clk_id)) {
      return 28;
    }
    var now;
    if (clk_id === 0) {
      now = _emscripten_date_now();
    } else if (nowIsMonotonic) {
      now = _emscripten_get_now();
    } else {
      return 52;
    }
    var nsec = Math.round(now * 1e3 * 1e3);
    HEAP64[ptime >> 3] = BigInt(nsec);
    return 0;
    ;
  }
  var _emscripten_err = (str) => err(UTF8ToString(str));
  var getHeapMax = () => (
    // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
    // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
    // for any code that deals with heap sizes, which would require special
    // casing all heap size related code to treat 0 specially.
    2147483648
  );
  var alignMemory = (size, alignment) => {
    assert(alignment, "alignment argument is required");
    return Math.ceil(size / alignment) * alignment;
  };
  var growMemory = (size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1;
    } catch (e) {
      err(`growMemory: Attempted to grow heap from ${oldHeapSize} bytes to ${size} bytes, but got error: ${e}`);
    }
  };
  var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    assert(requestedSize > oldSize);
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
      err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
      return false;
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = growMemory(newSize);
      if (replacement) {
        return true;
      }
    }
    err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
    return false;
  };
  var convertFrameToPC = (frame) => {
    var match;
    if (match = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(frame)) {
      return +match[1];
    } else if (match = /\bwasm-function\[(\d+)\]:(\d+)/.exec(frame)) {
      warnOnce("legacy backtrace format detected, this version of v8 is no longer supported by the emscripten backtrace mechanism");
    } else if (match = /:(\d+):\d+(?:\)|$)/.exec(frame)) {
      return 2147483648 | +match[1];
    }
    return 0;
  };
  var jsStackTrace = () => new Error().stack.toString();
  var _emscripten_return_address = (level) => {
    var callstack = jsStackTrace().split("\n");
    if (callstack[0] == "Error") {
      callstack.shift();
    }
    var caller = callstack[level + 3];
    return convertFrameToPC(caller);
  };
  var _emscripten_run_script = (ptr) => {
    throw new Error(`emscripten_run_script is disabled: ${UTF8ToString(ptr)}`);
  };
  var ENV = {};
  var getExecutableName = () => thisProgram || "./this.program";
  var getEnvStrings = () => {
    if (!getEnvStrings.strings) {
      var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
      var env = {
        "USER": "web_user",
        "LOGNAME": "web_user",
        "PATH": "/",
        "PWD": "/",
        "HOME": "/home/web_user",
        "LANG": lang,
        "_": getExecutableName()
      };
      for (var x in ENV) {
        if (ENV[x] === void 0) delete env[x];
        else env[x] = ENV[x];
      }
      var strings = [];
      for (var x in env) {
        strings.push(`${x}=${env[x]}`);
      }
      getEnvStrings.strings = strings;
    }
    return getEnvStrings.strings;
  };
  var _environ_get = (__environ, environ_buf) => {
    var bufSize = 0;
    var envp = 0;
    for (var string of getEnvStrings()) {
      var ptr2 = environ_buf + bufSize;
      HEAPU32[__environ + envp >> 2] = ptr2;
      bufSize += stringToUTF8(string, ptr2, Infinity) + 1;
      envp += 4;
    }
    return 0;
  };
  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
    var strings = getEnvStrings();
    HEAPU32[penviron_count >> 2] = strings.length;
    var bufSize = 0;
    for (var string of strings) {
      bufSize += lengthBytesUTF8(string) + 1;
    }
    HEAPU32[penviron_buf_size >> 2] = bufSize;
    return 0;
  };
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
    EXITSTATUS = code;
    if (!keepRuntimeAlive()) {
      Module["onExit"]?.(code);
      ABORT = true;
    }
    quit_(code, new ExitStatus(code));
  };
  var exitJS = (status, implicit) => {
    EXITSTATUS = status;
    checkUnflushedContent();
    if (keepRuntimeAlive() && !implicit) {
      var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
      readyPromiseReject?.(msg);
      err(msg);
    }
    _proc_exit(status);
  };
  var _exit = exitJS;
  function _fd_close(fd) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  var doReadv = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i2 = 0; i2 < iovcnt; i2++) {
      var ptr2 = HEAPU32[iov >> 2];
      var len = HEAPU32[iov + 4 >> 2];
      iov += 8;
      var curr = FS.read(stream, HEAP8, ptr2, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) break;
      if (typeof offset != "undefined") {
        offset += curr;
      }
    }
    return ret;
  };
  function _fd_read(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
    try {
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[newOffset >> 3] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
    ;
  }
  var doWritev = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i2 = 0; i2 < iovcnt; i2++) {
      var ptr2 = HEAPU32[iov >> 2];
      var len = HEAPU32[iov + 4 >> 2];
      iov += 8;
      var curr = FS.write(stream, HEAP8, ptr2, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) {
        break;
      }
      if (typeof offset != "undefined") {
        offset += curr;
      }
    }
    return ret;
  };
  function _fd_write(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  function _random_get(buffer, size) {
    try {
      randomFill(HEAPU8.subarray(buffer, buffer + size));
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  var FS_createPath = (...args) => FS.createPath(...args);
  var FS_unlink = (...args) => FS.unlink(...args);
  var FS_createLazyFile = (...args) => FS.createLazyFile(...args);
  var FS_createDevice = (...args) => FS.createDevice(...args);
  for (var base64ReverseLookup = new Uint8Array(
    123
    /*'z'+1*/
  ), i = 25; i >= 0; --i) {
    base64ReverseLookup[48 + i] = 52 + i;
    base64ReverseLookup[65 + i] = i;
    base64ReverseLookup[97 + i] = 26 + i;
  }
  base64ReverseLookup[43] = 62;
  base64ReverseLookup[47] = 63;
  ;
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.preloadFile = FS_preloadFile;
  FS.staticInit();
  ;
  {
    if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
    if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
    if (Module["print"]) out = Module["print"];
    if (Module["printErr"]) err = Module["printErr"];
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    checkIncomingModuleAPI();
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["read"] == "undefined", "Module.read option was removed");
    assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
    assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
    assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
    assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
    assert(typeof Module["ENVIRONMENT"] == "undefined", "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
    assert(typeof Module["STACK_SIZE"] == "undefined", "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
    assert(typeof Module["wasmMemory"] == "undefined", "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
    assert(typeof Module["INITIAL_MEMORY"] == "undefined", "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].shift()();
      }
    }
    consumedModuleProp("preInit");
  }
  Module["addRunDependency"] = addRunDependency;
  Module["removeRunDependency"] = removeRunDependency;
  Module["UTF8ToString"] = UTF8ToString;
  Module["stringToUTF8"] = stringToUTF8;
  Module["lengthBytesUTF8"] = lengthBytesUTF8;
  Module["FS_preloadFile"] = FS_preloadFile;
  Module["FS_unlink"] = FS_unlink;
  Module["FS_createPath"] = FS_createPath;
  Module["FS_createDevice"] = FS_createDevice;
  Module["FS"] = FS;
  Module["FS_createDataFile"] = FS_createDataFile;
  Module["FS_createLazyFile"] = FS_createLazyFile;
  var missingLibrarySymbols = [
    "writeI53ToI64",
    "writeI53ToI64Clamped",
    "writeI53ToI64Signaling",
    "writeI53ToU64Clamped",
    "writeI53ToU64Signaling",
    "readI53FromI64",
    "readI53FromU64",
    "convertI32PairToI53",
    "convertI32PairToI53Checked",
    "convertU32PairToI53",
    "stackAlloc",
    "getTempRet0",
    "createNamedFunction",
    "zeroMemory",
    "withStackSave",
    "inetPton4",
    "inetNtop4",
    "inetPton6",
    "inetNtop6",
    "readSockaddr",
    "writeSockaddr",
    "readEmAsmArgs",
    "jstoi_q",
    "autoResumeAudioContext",
    "getDynCaller",
    "dynCall",
    "handleException",
    "runtimeKeepalivePush",
    "runtimeKeepalivePop",
    "callUserCallback",
    "maybeExit",
    "asmjsMangle",
    "HandleAllocator",
    "addOnInit",
    "addOnPostCtor",
    "addOnPreMain",
    "addOnExit",
    "STACK_SIZE",
    "STACK_ALIGN",
    "POINTER_SIZE",
    "ASSERTIONS",
    "ccall",
    "cwrap",
    "convertJsFunctionToWasm",
    "getEmptyTableSlot",
    "updateTableMap",
    "getFunctionAddress",
    "addFunction",
    "removeFunction",
    "intArrayToString",
    "AsciiToString",
    "stringToAscii",
    "UTF16ToString",
    "stringToUTF16",
    "lengthBytesUTF16",
    "UTF32ToString",
    "stringToUTF32",
    "lengthBytesUTF32",
    "stringToNewUTF8",
    "stringToUTF8OnStack",
    "writeArrayToMemory",
    "registerKeyEventCallback",
    "maybeCStringToJsString",
    "findEventTarget",
    "getBoundingClientRect",
    "fillMouseEventData",
    "registerMouseEventCallback",
    "registerWheelEventCallback",
    "registerUiEventCallback",
    "registerFocusEventCallback",
    "fillDeviceOrientationEventData",
    "registerDeviceOrientationEventCallback",
    "fillDeviceMotionEventData",
    "registerDeviceMotionEventCallback",
    "screenOrientation",
    "fillOrientationChangeEventData",
    "registerOrientationChangeEventCallback",
    "fillFullscreenChangeEventData",
    "registerFullscreenChangeEventCallback",
    "JSEvents_requestFullscreen",
    "JSEvents_resizeCanvasForFullscreen",
    "registerRestoreOldStyle",
    "hideEverythingExceptGivenElement",
    "restoreHiddenElements",
    "setLetterbox",
    "softFullscreenResizeWebGLRenderTarget",
    "doRequestFullscreen",
    "fillPointerlockChangeEventData",
    "registerPointerlockChangeEventCallback",
    "registerPointerlockErrorEventCallback",
    "requestPointerLock",
    "fillVisibilityChangeEventData",
    "registerVisibilityChangeEventCallback",
    "registerTouchEventCallback",
    "fillGamepadEventData",
    "registerGamepadEventCallback",
    "registerBeforeUnloadEventCallback",
    "fillBatteryEventData",
    "registerBatteryEventCallback",
    "setCanvasElementSize",
    "getCanvasElementSize",
    "getCallstack",
    "convertPCtoSourceLocation",
    "wasiRightsToMuslOFlags",
    "wasiOFlagsToMuslOFlags",
    "safeSetTimeout",
    "setImmediateWrapped",
    "safeRequestAnimationFrame",
    "clearImmediateWrapped",
    "registerPostMainLoop",
    "registerPreMainLoop",
    "getPromise",
    "makePromise",
    "idsToPromises",
    "makePromiseCallback",
    "Browser_asyncPrepareDataCounter",
    "isLeapYear",
    "ydayFromDate",
    "arraySum",
    "addDays",
    "getSocketFromFD",
    "getSocketAddress",
    "FS_mkdirTree",
    "_setNetworkCallback",
    "heapObjectForWebGLType",
    "toTypedArrayIndex",
    "webgl_enable_ANGLE_instanced_arrays",
    "webgl_enable_OES_vertex_array_object",
    "webgl_enable_WEBGL_draw_buffers",
    "webgl_enable_WEBGL_multi_draw",
    "webgl_enable_EXT_polygon_offset_clamp",
    "webgl_enable_EXT_clip_control",
    "webgl_enable_WEBGL_polygon_mode",
    "emscriptenWebGLGet",
    "computeUnpackAlignedImageSize",
    "colorChannelsInGlTextureFormat",
    "emscriptenWebGLGetTexPixelData",
    "emscriptenWebGLGetUniform",
    "webglGetUniformLocation",
    "webglPrepareUniformLocationsBeforeFirstUse",
    "webglGetLeftBracePos",
    "emscriptenWebGLGetVertexAttrib",
    "__glGetActiveAttribOrUniform",
    "writeGLArray",
    "registerWebGlEventCallback",
    "runAndAbortIfError",
    "ALLOC_NORMAL",
    "ALLOC_STACK",
    "allocate",
    "writeStringToMemory",
    "writeAsciiToMemory",
    "allocateUTF8",
    "allocateUTF8OnStack",
    "demangle",
    "stackTrace",
    "getNativeTypeSize"
  ];
  missingLibrarySymbols.forEach(missingLibrarySymbol);
  var unexportedSymbols = [
    "run",
    "out",
    "err",
    "callMain",
    "abort",
    "wasmExports",
    "HEAPF32",
    "HEAPF64",
    "HEAP8",
    "HEAP16",
    "HEAPU16",
    "HEAP32",
    "HEAPU32",
    "HEAP64",
    "HEAPU64",
    "writeStackCookie",
    "checkStackCookie",
    "INT53_MAX",
    "INT53_MIN",
    "bigintToI53Checked",
    "stackSave",
    "stackRestore",
    "setTempRet0",
    "ptrToString",
    "exitJS",
    "getHeapMax",
    "growMemory",
    "ENV",
    "ERRNO_CODES",
    "strError",
    "DNS",
    "Protocols",
    "Sockets",
    "timers",
    "warnOnce",
    "readEmAsmArgsArray",
    "getExecutableName",
    "keepRuntimeAlive",
    "asyncLoad",
    "alignMemory",
    "mmapAlloc",
    "wasmTable",
    "wasmMemory",
    "getUniqueRunDependency",
    "noExitRuntime",
    "addOnPreRun",
    "addOnPostRun",
    "freeTableIndexes",
    "functionsInTableMap",
    "setValue",
    "getValue",
    "PATH",
    "PATH_FS",
    "UTF8Decoder",
    "UTF8ArrayToString",
    "stringToUTF8Array",
    "intArrayFromString",
    "UTF16Decoder",
    "JSEvents",
    "specialHTMLTargets",
    "findCanvasEventTarget",
    "currentFullscreenStrategy",
    "restoreOldWindowedStyle",
    "jsStackTrace",
    "UNWIND_CACHE",
    "ExitStatus",
    "getEnvStrings",
    "checkWasiClock",
    "doReadv",
    "doWritev",
    "initRandomFill",
    "randomFill",
    "emSetImmediate",
    "emClearImmediate_deps",
    "emClearImmediate",
    "promiseMap",
    "uncaughtExceptionCount",
    "exceptionLast",
    "exceptionCaught",
    "ExceptionInfo",
    "findMatchingCatch",
    "Browser",
    "requestFullscreen",
    "requestFullScreen",
    "setCanvasSize",
    "getUserMedia",
    "createContext",
    "getPreloadedImageData__data",
    "wget",
    "MONTH_DAYS_REGULAR",
    "MONTH_DAYS_LEAP",
    "MONTH_DAYS_REGULAR_CUMULATIVE",
    "MONTH_DAYS_LEAP_CUMULATIVE",
    "base64Decode",
    "SYSCALLS",
    "preloadPlugins",
    "FS_createPreloadedFile",
    "FS_modeStringToFlags",
    "FS_getMode",
    "FS_stdin_getChar_buffer",
    "FS_stdin_getChar",
    "FS_readFile",
    "FS_root",
    "FS_mounts",
    "FS_devices",
    "FS_streams",
    "FS_nextInode",
    "FS_nameTable",
    "FS_currentPath",
    "FS_initialized",
    "FS_ignorePermissions",
    "FS_filesystems",
    "FS_syncFSRequests",
    "FS_lookupPath",
    "FS_getPath",
    "FS_hashName",
    "FS_hashAddNode",
    "FS_hashRemoveNode",
    "FS_lookupNode",
    "FS_createNode",
    "FS_destroyNode",
    "FS_isRoot",
    "FS_isMountpoint",
    "FS_isFile",
    "FS_isDir",
    "FS_isLink",
    "FS_isChrdev",
    "FS_isBlkdev",
    "FS_isFIFO",
    "FS_isSocket",
    "FS_flagsToPermissionString",
    "FS_nodePermissions",
    "FS_mayLookup",
    "FS_mayCreate",
    "FS_mayDelete",
    "FS_mayOpen",
    "FS_checkOpExists",
    "FS_nextfd",
    "FS_getStreamChecked",
    "FS_getStream",
    "FS_createStream",
    "FS_closeStream",
    "FS_dupStream",
    "FS_doSetAttr",
    "FS_chrdev_stream_ops",
    "FS_major",
    "FS_minor",
    "FS_makedev",
    "FS_registerDevice",
    "FS_getDevice",
    "FS_getMounts",
    "FS_syncfs",
    "FS_mount",
    "FS_unmount",
    "FS_lookup",
    "FS_mknod",
    "FS_statfs",
    "FS_statfsStream",
    "FS_statfsNode",
    "FS_create",
    "FS_mkdir",
    "FS_mkdev",
    "FS_symlink",
    "FS_rename",
    "FS_rmdir",
    "FS_readdir",
    "FS_readlink",
    "FS_stat",
    "FS_fstat",
    "FS_lstat",
    "FS_doChmod",
    "FS_chmod",
    "FS_lchmod",
    "FS_fchmod",
    "FS_doChown",
    "FS_chown",
    "FS_lchown",
    "FS_fchown",
    "FS_doTruncate",
    "FS_truncate",
    "FS_ftruncate",
    "FS_utime",
    "FS_open",
    "FS_close",
    "FS_isClosed",
    "FS_llseek",
    "FS_read",
    "FS_write",
    "FS_mmap",
    "FS_msync",
    "FS_ioctl",
    "FS_writeFile",
    "FS_cwd",
    "FS_chdir",
    "FS_createDefaultDirectories",
    "FS_createDefaultDevices",
    "FS_createSpecialDirectories",
    "FS_createStandardStreams",
    "FS_staticInit",
    "FS_init",
    "FS_quit",
    "FS_findObject",
    "FS_analyzePath",
    "FS_createFile",
    "FS_forceLoadFile",
    "FS_absolutePath",
    "FS_createFolder",
    "FS_createLink",
    "FS_joinPath",
    "FS_mmapAlloc",
    "FS_standardizePath",
    "MEMFS",
    "TTY",
    "PIPEFS",
    "SOCKFS",
    "tempFixedLengthArray",
    "miniTempWebGLFloatBuffers",
    "miniTempWebGLIntBuffers",
    "GL",
    "AL",
    "GLUT",
    "EGL",
    "GLEW",
    "IDBStore",
    "SDL",
    "SDL_gfx",
    "print",
    "printErr",
    "jstoi_s",
    "IDBFS"
  ];
  unexportedSymbols.forEach(unexportedRuntimeSymbol);
  function checkIncomingModuleAPI() {
    ignoredModuleProp("fetchSettings");
    ignoredModuleProp("logReadFiles");
    ignoredModuleProp("loadSplitModule");
  }
  var _anisette_end_provisioning = Module["_anisette_end_provisioning"] = makeInvalidEarlyAccess("_anisette_end_provisioning");
  var _anisette_fs_read_file = Module["_anisette_fs_read_file"] = makeInvalidEarlyAccess("_anisette_fs_read_file");
  var _anisette_fs_read_len = Module["_anisette_fs_read_len"] = makeInvalidEarlyAccess("_anisette_fs_read_len");
  var _anisette_fs_read_ptr = Module["_anisette_fs_read_ptr"] = makeInvalidEarlyAccess("_anisette_fs_read_ptr");
  var _anisette_fs_write_file = Module["_anisette_fs_write_file"] = makeInvalidEarlyAccess("_anisette_fs_write_file");
  var _anisette_get_cpim_len = Module["_anisette_get_cpim_len"] = makeInvalidEarlyAccess("_anisette_get_cpim_len");
  var _anisette_get_cpim_ptr = Module["_anisette_get_cpim_ptr"] = makeInvalidEarlyAccess("_anisette_get_cpim_ptr");
  var _anisette_get_mid_len = Module["_anisette_get_mid_len"] = makeInvalidEarlyAccess("_anisette_get_mid_len");
  var _anisette_get_mid_ptr = Module["_anisette_get_mid_ptr"] = makeInvalidEarlyAccess("_anisette_get_mid_ptr");
  var _anisette_get_otp_len = Module["_anisette_get_otp_len"] = makeInvalidEarlyAccess("_anisette_get_otp_len");
  var _anisette_get_otp_ptr = Module["_anisette_get_otp_ptr"] = makeInvalidEarlyAccess("_anisette_get_otp_ptr");
  var _anisette_get_session = Module["_anisette_get_session"] = makeInvalidEarlyAccess("_anisette_get_session");
  var _anisette_idbfs_sync = Module["_anisette_idbfs_sync"] = makeInvalidEarlyAccess("_anisette_idbfs_sync");
  var _anisette_init_from_blobs = Module["_anisette_init_from_blobs"] = makeInvalidEarlyAccess("_anisette_init_from_blobs");
  var _anisette_is_machine_provisioned = Module["_anisette_is_machine_provisioned"] = makeInvalidEarlyAccess("_anisette_is_machine_provisioned");
  var _anisette_last_error_len = Module["_anisette_last_error_len"] = makeInvalidEarlyAccess("_anisette_last_error_len");
  var _anisette_last_error_ptr = Module["_anisette_last_error_ptr"] = makeInvalidEarlyAccess("_anisette_last_error_ptr");
  var _anisette_request_otp = Module["_anisette_request_otp"] = makeInvalidEarlyAccess("_anisette_request_otp");
  var _anisette_set_identifier = Module["_anisette_set_identifier"] = makeInvalidEarlyAccess("_anisette_set_identifier");
  var _anisette_set_provisioning_path = Module["_anisette_set_provisioning_path"] = makeInvalidEarlyAccess("_anisette_set_provisioning_path");
  var _anisette_start_provisioning = Module["_anisette_start_provisioning"] = makeInvalidEarlyAccess("_anisette_start_provisioning");
  var _fflush = makeInvalidEarlyAccess("_fflush");
  var _htonl = makeInvalidEarlyAccess("_htonl");
  var _htons = makeInvalidEarlyAccess("_htons");
  var _ntohs = makeInvalidEarlyAccess("_ntohs");
  var _strerror = makeInvalidEarlyAccess("_strerror");
  var _malloc = Module["_malloc"] = makeInvalidEarlyAccess("_malloc");
  var _free = Module["_free"] = makeInvalidEarlyAccess("_free");
  var _realloc = makeInvalidEarlyAccess("_realloc");
  var _setThrew = makeInvalidEarlyAccess("_setThrew");
  var __emscripten_tempret_set = makeInvalidEarlyAccess("__emscripten_tempret_set");
  var _emscripten_stack_init = makeInvalidEarlyAccess("_emscripten_stack_init");
  var _emscripten_stack_get_free = makeInvalidEarlyAccess("_emscripten_stack_get_free");
  var _emscripten_stack_get_base = makeInvalidEarlyAccess("_emscripten_stack_get_base");
  var _emscripten_stack_get_end = makeInvalidEarlyAccess("_emscripten_stack_get_end");
  var __emscripten_stack_restore = makeInvalidEarlyAccess("__emscripten_stack_restore");
  var __emscripten_stack_alloc = makeInvalidEarlyAccess("__emscripten_stack_alloc");
  var _emscripten_stack_get_current = makeInvalidEarlyAccess("_emscripten_stack_get_current");
  var ___cxa_decrement_exception_refcount = makeInvalidEarlyAccess("___cxa_decrement_exception_refcount");
  var ___cxa_can_catch = makeInvalidEarlyAccess("___cxa_can_catch");
  var ___cxa_get_exception_ptr = makeInvalidEarlyAccess("___cxa_get_exception_ptr");
  var memory = makeInvalidEarlyAccess("memory");
  var __indirect_function_table = makeInvalidEarlyAccess("__indirect_function_table");
  var wasmMemory = makeInvalidEarlyAccess("wasmMemory");
  var wasmTable = makeInvalidEarlyAccess("wasmTable");
  function assignWasmExports(wasmExports2) {
    assert(typeof wasmExports2["anisette_end_provisioning"] != "undefined", "missing Wasm export: anisette_end_provisioning");
    assert(typeof wasmExports2["anisette_fs_read_file"] != "undefined", "missing Wasm export: anisette_fs_read_file");
    assert(typeof wasmExports2["anisette_fs_read_len"] != "undefined", "missing Wasm export: anisette_fs_read_len");
    assert(typeof wasmExports2["anisette_fs_read_ptr"] != "undefined", "missing Wasm export: anisette_fs_read_ptr");
    assert(typeof wasmExports2["anisette_fs_write_file"] != "undefined", "missing Wasm export: anisette_fs_write_file");
    assert(typeof wasmExports2["anisette_get_cpim_len"] != "undefined", "missing Wasm export: anisette_get_cpim_len");
    assert(typeof wasmExports2["anisette_get_cpim_ptr"] != "undefined", "missing Wasm export: anisette_get_cpim_ptr");
    assert(typeof wasmExports2["anisette_get_mid_len"] != "undefined", "missing Wasm export: anisette_get_mid_len");
    assert(typeof wasmExports2["anisette_get_mid_ptr"] != "undefined", "missing Wasm export: anisette_get_mid_ptr");
    assert(typeof wasmExports2["anisette_get_otp_len"] != "undefined", "missing Wasm export: anisette_get_otp_len");
    assert(typeof wasmExports2["anisette_get_otp_ptr"] != "undefined", "missing Wasm export: anisette_get_otp_ptr");
    assert(typeof wasmExports2["anisette_get_session"] != "undefined", "missing Wasm export: anisette_get_session");
    assert(typeof wasmExports2["anisette_idbfs_sync"] != "undefined", "missing Wasm export: anisette_idbfs_sync");
    assert(typeof wasmExports2["anisette_init_from_blobs"] != "undefined", "missing Wasm export: anisette_init_from_blobs");
    assert(typeof wasmExports2["anisette_is_machine_provisioned"] != "undefined", "missing Wasm export: anisette_is_machine_provisioned");
    assert(typeof wasmExports2["anisette_last_error_len"] != "undefined", "missing Wasm export: anisette_last_error_len");
    assert(typeof wasmExports2["anisette_last_error_ptr"] != "undefined", "missing Wasm export: anisette_last_error_ptr");
    assert(typeof wasmExports2["anisette_request_otp"] != "undefined", "missing Wasm export: anisette_request_otp");
    assert(typeof wasmExports2["anisette_set_identifier"] != "undefined", "missing Wasm export: anisette_set_identifier");
    assert(typeof wasmExports2["anisette_set_provisioning_path"] != "undefined", "missing Wasm export: anisette_set_provisioning_path");
    assert(typeof wasmExports2["anisette_start_provisioning"] != "undefined", "missing Wasm export: anisette_start_provisioning");
    assert(typeof wasmExports2["fflush"] != "undefined", "missing Wasm export: fflush");
    assert(typeof wasmExports2["htonl"] != "undefined", "missing Wasm export: htonl");
    assert(typeof wasmExports2["htons"] != "undefined", "missing Wasm export: htons");
    assert(typeof wasmExports2["ntohs"] != "undefined", "missing Wasm export: ntohs");
    assert(typeof wasmExports2["strerror"] != "undefined", "missing Wasm export: strerror");
    assert(typeof wasmExports2["malloc"] != "undefined", "missing Wasm export: malloc");
    assert(typeof wasmExports2["free"] != "undefined", "missing Wasm export: free");
    assert(typeof wasmExports2["realloc"] != "undefined", "missing Wasm export: realloc");
    assert(typeof wasmExports2["setThrew"] != "undefined", "missing Wasm export: setThrew");
    assert(typeof wasmExports2["_emscripten_tempret_set"] != "undefined", "missing Wasm export: _emscripten_tempret_set");
    assert(typeof wasmExports2["emscripten_stack_init"] != "undefined", "missing Wasm export: emscripten_stack_init");
    assert(typeof wasmExports2["emscripten_stack_get_free"] != "undefined", "missing Wasm export: emscripten_stack_get_free");
    assert(typeof wasmExports2["emscripten_stack_get_base"] != "undefined", "missing Wasm export: emscripten_stack_get_base");
    assert(typeof wasmExports2["emscripten_stack_get_end"] != "undefined", "missing Wasm export: emscripten_stack_get_end");
    assert(typeof wasmExports2["_emscripten_stack_restore"] != "undefined", "missing Wasm export: _emscripten_stack_restore");
    assert(typeof wasmExports2["_emscripten_stack_alloc"] != "undefined", "missing Wasm export: _emscripten_stack_alloc");
    assert(typeof wasmExports2["emscripten_stack_get_current"] != "undefined", "missing Wasm export: emscripten_stack_get_current");
    assert(typeof wasmExports2["__cxa_decrement_exception_refcount"] != "undefined", "missing Wasm export: __cxa_decrement_exception_refcount");
    assert(typeof wasmExports2["__cxa_can_catch"] != "undefined", "missing Wasm export: __cxa_can_catch");
    assert(typeof wasmExports2["__cxa_get_exception_ptr"] != "undefined", "missing Wasm export: __cxa_get_exception_ptr");
    assert(typeof wasmExports2["memory"] != "undefined", "missing Wasm export: memory");
    assert(typeof wasmExports2["__indirect_function_table"] != "undefined", "missing Wasm export: __indirect_function_table");
    _anisette_end_provisioning = Module["_anisette_end_provisioning"] = createExportWrapper("anisette_end_provisioning", 5);
    _anisette_fs_read_file = Module["_anisette_fs_read_file"] = createExportWrapper("anisette_fs_read_file", 1);
    _anisette_fs_read_len = Module["_anisette_fs_read_len"] = createExportWrapper("anisette_fs_read_len", 0);
    _anisette_fs_read_ptr = Module["_anisette_fs_read_ptr"] = createExportWrapper("anisette_fs_read_ptr", 0);
    _anisette_fs_write_file = Module["_anisette_fs_write_file"] = createExportWrapper("anisette_fs_write_file", 3);
    _anisette_get_cpim_len = Module["_anisette_get_cpim_len"] = createExportWrapper("anisette_get_cpim_len", 0);
    _anisette_get_cpim_ptr = Module["_anisette_get_cpim_ptr"] = createExportWrapper("anisette_get_cpim_ptr", 0);
    _anisette_get_mid_len = Module["_anisette_get_mid_len"] = createExportWrapper("anisette_get_mid_len", 0);
    _anisette_get_mid_ptr = Module["_anisette_get_mid_ptr"] = createExportWrapper("anisette_get_mid_ptr", 0);
    _anisette_get_otp_len = Module["_anisette_get_otp_len"] = createExportWrapper("anisette_get_otp_len", 0);
    _anisette_get_otp_ptr = Module["_anisette_get_otp_ptr"] = createExportWrapper("anisette_get_otp_ptr", 0);
    _anisette_get_session = Module["_anisette_get_session"] = createExportWrapper("anisette_get_session", 0);
    _anisette_idbfs_sync = Module["_anisette_idbfs_sync"] = createExportWrapper("anisette_idbfs_sync", 1);
    _anisette_init_from_blobs = Module["_anisette_init_from_blobs"] = createExportWrapper("anisette_init_from_blobs", 7);
    _anisette_is_machine_provisioned = Module["_anisette_is_machine_provisioned"] = createExportWrapper("anisette_is_machine_provisioned", 1);
    _anisette_last_error_len = Module["_anisette_last_error_len"] = createExportWrapper("anisette_last_error_len", 0);
    _anisette_last_error_ptr = Module["_anisette_last_error_ptr"] = createExportWrapper("anisette_last_error_ptr", 0);
    _anisette_request_otp = Module["_anisette_request_otp"] = createExportWrapper("anisette_request_otp", 1);
    _anisette_set_identifier = Module["_anisette_set_identifier"] = createExportWrapper("anisette_set_identifier", 1);
    _anisette_set_provisioning_path = Module["_anisette_set_provisioning_path"] = createExportWrapper("anisette_set_provisioning_path", 1);
    _anisette_start_provisioning = Module["_anisette_start_provisioning"] = createExportWrapper("anisette_start_provisioning", 3);
    _fflush = createExportWrapper("fflush", 1);
    _htonl = createExportWrapper("htonl", 1);
    _htons = createExportWrapper("htons", 1);
    _ntohs = createExportWrapper("ntohs", 1);
    _strerror = createExportWrapper("strerror", 1);
    _malloc = Module["_malloc"] = createExportWrapper("malloc", 1);
    _free = Module["_free"] = createExportWrapper("free", 1);
    _realloc = createExportWrapper("realloc", 2);
    _setThrew = createExportWrapper("setThrew", 2);
    __emscripten_tempret_set = createExportWrapper("_emscripten_tempret_set", 1);
    _emscripten_stack_init = wasmExports2["emscripten_stack_init"];
    _emscripten_stack_get_free = wasmExports2["emscripten_stack_get_free"];
    _emscripten_stack_get_base = wasmExports2["emscripten_stack_get_base"];
    _emscripten_stack_get_end = wasmExports2["emscripten_stack_get_end"];
    __emscripten_stack_restore = wasmExports2["_emscripten_stack_restore"];
    __emscripten_stack_alloc = wasmExports2["_emscripten_stack_alloc"];
    _emscripten_stack_get_current = wasmExports2["emscripten_stack_get_current"];
    ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount", 1);
    ___cxa_can_catch = createExportWrapper("__cxa_can_catch", 3);
    ___cxa_get_exception_ptr = createExportWrapper("__cxa_get_exception_ptr", 1);
    memory = wasmMemory = wasmExports2["memory"];
    __indirect_function_table = wasmTable = wasmExports2["__indirect_function_table"];
  }
  var wasmImports = {
    /** @export */
    __call_sighandler: ___call_sighandler,
    /** @export */
    __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
    /** @export */
    __cxa_throw: ___cxa_throw,
    /** @export */
    __resumeException: ___resumeException,
    /** @export */
    __syscall_fcntl64: ___syscall_fcntl64,
    /** @export */
    __syscall_fstat64: ___syscall_fstat64,
    /** @export */
    __syscall_ftruncate64: ___syscall_ftruncate64,
    /** @export */
    __syscall_getcwd: ___syscall_getcwd,
    /** @export */
    __syscall_ioctl: ___syscall_ioctl,
    /** @export */
    __syscall_lstat64: ___syscall_lstat64,
    /** @export */
    __syscall_mkdirat: ___syscall_mkdirat,
    /** @export */
    __syscall_newfstatat: ___syscall_newfstatat,
    /** @export */
    __syscall_openat: ___syscall_openat,
    /** @export */
    __syscall_stat64: ___syscall_stat64,
    /** @export */
    _abort_js: __abort_js,
    /** @export */
    _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
    /** @export */
    _emscripten_throw_longjmp: __emscripten_throw_longjmp,
    /** @export */
    clock_time_get: _clock_time_get,
    /** @export */
    emscripten_date_now: _emscripten_date_now,
    /** @export */
    emscripten_err: _emscripten_err,
    /** @export */
    emscripten_get_now: _emscripten_get_now,
    /** @export */
    emscripten_resize_heap: _emscripten_resize_heap,
    /** @export */
    emscripten_return_address: _emscripten_return_address,
    /** @export */
    emscripten_run_script: _emscripten_run_script,
    /** @export */
    environ_get: _environ_get,
    /** @export */
    environ_sizes_get: _environ_sizes_get,
    /** @export */
    exit: _exit,
    /** @export */
    fd_close: _fd_close,
    /** @export */
    fd_read: _fd_read,
    /** @export */
    fd_seek: _fd_seek,
    /** @export */
    fd_write: _fd_write,
    /** @export */
    invoke_dddd,
    /** @export */
    invoke_ii,
    /** @export */
    invoke_iii,
    /** @export */
    invoke_iiii,
    /** @export */
    invoke_iiiiii,
    /** @export */
    invoke_iij,
    /** @export */
    invoke_iijjii,
    /** @export */
    invoke_jii,
    /** @export */
    invoke_vi,
    /** @export */
    invoke_vii,
    /** @export */
    invoke_viii,
    /** @export */
    invoke_viiii,
    /** @export */
    invoke_viiiii,
    /** @export */
    invoke_viiiiii,
    /** @export */
    invoke_viiiiiii,
    /** @export */
    invoke_viiiiiiii,
    /** @export */
    invoke_viiijj,
    /** @export */
    invoke_viij,
    /** @export */
    invoke_viiji,
    /** @export */
    invoke_viijii,
    /** @export */
    invoke_viijij,
    /** @export */
    invoke_viijijjj,
    /** @export */
    invoke_viijj,
    /** @export */
    invoke_vij,
    /** @export */
    proc_exit: _proc_exit,
    /** @export */
    random_get: _random_get
  };
  function invoke_vi(index, a1) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_vii(index, a1, a2) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_iiii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2, a3);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_ii(index, a1) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_iii(index, a1, a2) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_jii(index, a1, a2) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
      return 0n;
    }
  }
  function invoke_iij(index, a1, a2) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viij(index, a1, a2, a3) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viijii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_dddd(index, a1, a2, a3) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2, a3);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_vij(index, a1, a2) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_iijjii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viijj(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiijj(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viiji(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viijij(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  function invoke_viijijjj(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
      getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
    }
  }
  var calledRun;
  function stackCheckInit() {
    _emscripten_stack_init();
    writeStackCookie();
  }
  function run() {
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    stackCheckInit();
    preRun();
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    function doRun() {
      assert(!calledRun);
      calledRun = true;
      Module["calledRun"] = true;
      if (ABORT) return;
      initRuntime();
      readyPromiseResolve?.(Module);
      Module["onRuntimeInitialized"]?.();
      consumedModuleProp("onRuntimeInitialized");
      assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(() => {
        setTimeout(() => Module["setStatus"](""), 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
    checkStackCookie();
  }
  function checkUnflushedContent() {
    var oldOut = out;
    var oldErr = err;
    var has = false;
    out = err = (x) => {
      has = true;
    };
    try {
      _fflush(0);
      for (var name of ["stdout", "stderr"]) {
        var info = FS.analyzePath("/dev/" + name);
        if (!info) return;
        var stream = info.object;
        var rdev = stream.rdev;
        var tty = TTY.ttys[rdev];
        if (tty?.output?.length) {
          has = true;
        }
      }
    } catch (e) {
    }
    out = oldOut;
    err = oldErr;
    if (has) {
      warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
    }
  }
  var wasmExports;
  wasmExports = await createWasm();
  run();
  if (runtimeInitialized) {
    moduleRtn = Module;
  } else {
    moduleRtn = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
  }
  for (const prop of Object.keys(Module)) {
    if (!(prop in moduleArg)) {
      Object.defineProperty(moduleArg, prop, {
        configurable: true,
        get() {
          abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
        }
      });
    }
  }
  return moduleRtn;
}
var anisette_rs_default = Module2;

// node_modules/@lbr77/anisette-js/dist/wasm-bridge.js
var WasmBridge = class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  m;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(wasmModule) {
    this.m = wasmModule;
  }
  // ---- memory helpers ----
  allocBytes(bytes) {
    const ptr2 = this.m._malloc(bytes.length);
    this.m.HEAPU8.set(bytes, ptr2);
    return ptr2;
  }
  allocCString(value) {
    if (!value)
      return 0;
    const size = this.m.lengthBytesUTF8(value) + 1;
    const ptr2 = this.m._malloc(size);
    this.m.stringToUTF8(value, ptr2, size);
    return ptr2;
  }
  readBytes(ptr2, len) {
    if (!ptr2 || !len)
      return new Uint8Array(0);
    return this.m.HEAPU8.slice(ptr2, ptr2 + len);
  }
  free(ptr2) {
    if (ptr2)
      this.m._free(ptr2);
  }
  // ---- error handling ----
  getLastError() {
    const ptr2 = this.m._anisette_last_error_ptr();
    const len = this.m._anisette_last_error_len();
    if (!ptr2 || !len)
      return "";
    const bytes = this.m.HEAPU8.subarray(ptr2, ptr2 + len);
    return new TextDecoder("utf-8").decode(bytes);
  }
  check(result, context) {
    if (result !== 0) {
      const msg = this.getLastError();
      throw new Error(`${context}: ${msg || "unknown error"}`);
    }
  }
  // ---- public API ----
  /**
   * Initialize ADI from in-memory library blobs.
   */
  initFromBlobs(storeservices, coreadi, libraryPath, provisioningPath, identifier) {
    const ssPtr = this.allocBytes(storeservices);
    const caPtr = this.allocBytes(coreadi);
    const libPtr = this.allocCString(libraryPath);
    const provPtr = this.allocCString(provisioningPath ?? null);
    const idPtr = this.allocCString(identifier ?? null);
    try {
      const result = this.m._anisette_init_from_blobs(ssPtr, storeservices.length, caPtr, coreadi.length, libPtr, provPtr, idPtr);
      this.check(result, "anisette_init_from_blobs");
    } finally {
      this.free(ssPtr);
      this.free(caPtr);
      this.free(libPtr);
      this.free(provPtr);
      this.free(idPtr);
    }
  }
  /**
   * Read a file from the WASM virtual filesystem.
   */
  readVirtualFile(filePath) {
    const pathPtr = this.allocCString(filePath);
    try {
      const result = this.m._anisette_fs_read_file(pathPtr);
      this.check(result, `anisette_fs_read_file(${filePath})`);
    } finally {
      this.free(pathPtr);
    }
    const ptr2 = this.m._anisette_fs_read_ptr();
    const len = this.m._anisette_fs_read_len();
    return this.readBytes(ptr2, len);
  }
  /**
   * Write a file into the WASM virtual filesystem.
   */
  writeVirtualFile(filePath, data) {
    const pathPtr = this.allocCString(filePath);
    const dataPtr = this.allocBytes(data);
    try {
      const result = this.m._anisette_fs_write_file(pathPtr, dataPtr, data.length);
      this.check(result, `anisette_fs_write_file(${filePath})`);
    } finally {
      this.free(pathPtr);
      this.free(dataPtr);
    }
  }
  /**
   * Returns 1 if provisioned, 0 if not, throws on error.
   */
  isMachineProvisioned(dsid) {
    const result = this.m._anisette_is_machine_provisioned(dsid);
    if (result < 0) {
      throw new Error(`anisette_is_machine_provisioned: ${this.getLastError()}`);
    }
    return result === 1;
  }
  /**
   * Start provisioning — returns CPIM bytes and session handle.
   */
  startProvisioning(dsid, spim) {
    const spimPtr = this.allocBytes(spim);
    try {
      const result = this.m._anisette_start_provisioning(dsid, spimPtr, spim.length);
      this.check(result, "anisette_start_provisioning");
    } finally {
      this.free(spimPtr);
    }
    const cpimPtr = this.m._anisette_get_cpim_ptr();
    const cpimLen = this.m._anisette_get_cpim_len();
    const session = this.m._anisette_get_session();
    return {
      cpim: this.readBytes(cpimPtr, cpimLen),
      session
    };
  }
  /**
   * Finish provisioning with PTM and TK from Apple servers.
   */
  endProvisioning(session, ptm, tk) {
    const ptmPtr = this.allocBytes(ptm);
    const tkPtr = this.allocBytes(tk);
    try {
      const result = this.m._anisette_end_provisioning(session, ptmPtr, ptm.length, tkPtr, tk.length);
      this.check(result, "anisette_end_provisioning");
    } finally {
      this.free(ptmPtr);
      this.free(tkPtr);
    }
  }
  /**
   * Request OTP — returns OTP bytes and machine ID bytes.
   */
  requestOtp(dsid) {
    const result = this.m._anisette_request_otp(dsid);
    this.check(result, "anisette_request_otp");
    const otpPtr = this.m._anisette_get_otp_ptr();
    const otpLen = this.m._anisette_get_otp_len();
    const midPtr = this.m._anisette_get_mid_ptr();
    const midLen = this.m._anisette_get_mid_len();
    return {
      otp: this.readBytes(otpPtr, otpLen),
      machineId: this.readBytes(midPtr, midLen)
    };
  }
  /**
   * Check if IDBFS is available (browser environment only).
   */
  isIdbfsAvailable() {
    try {
      return !!(this.m.FS && this.m.FS.filesystems?.IDBFS);
    } catch {
      return false;
    }
  }
  /**
   * Initialize IDBFS for browser persistence.
   * Only works in browser environments with IDBFS available.
   */
  initIdbfs(path) {
    if (!this.isIdbfsAvailable()) {
      return;
    }
    const normalizedPath = this.normalizeMountPath(path);
    if (normalizedPath !== "/") {
      try {
        this.m.FS.mkdirTree(normalizedPath);
      } catch {
      }
    }
    try {
      this.m.FS.mount(this.m.FS.filesystems.IDBFS, {}, normalizedPath);
    } catch {
    }
  }
  /**
   * Sync IDBFS from IndexedDB to memory (async).
   * Must be called after initIdbfs to load existing data from IndexedDB.
   * Only works in browser environments with IDBFS available.
   */
  async syncIdbfsFromStorage() {
    if (!this.isIdbfsAvailable()) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.m.FS.syncfs(true, (err2) => {
        if (err2) {
          console.error("[anisette] IDBFS sync from storage failed:", err2);
          reject(err2);
        } else {
          resolve();
        }
      });
    });
  }
  /**
   * Sync IDBFS from memory to IndexedDB (async).
   * Must be called after modifying files to persist them.
   * Only works in browser environments with IDBFS available.
   */
  async syncIdbfsToStorage() {
    if (!this.isIdbfsAvailable()) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.m.FS.syncfs(false, (err2) => {
        if (err2) {
          console.error("[anisette] IDBFS sync to storage failed:", err2);
          reject(err2);
        } else {
          resolve();
        }
      });
    });
  }
  normalizeMountPath(path) {
    const trimmed = path.trim();
    const noSlash = trimmed.replace(/\/+$/, "");
    const noDot = noSlash.startsWith("./") ? noSlash.slice(2) : noSlash;
    if (!noDot || noDot === ".") {
      return "/";
    } else if (noDot.startsWith("/")) {
      return noDot;
    } else {
      return "/" + noDot;
    }
  }
};

// node_modules/@lbr77/anisette-js/dist/utils.js
var TEXT_ENCODER = new TextEncoder();
var TEXT_DECODER = new TextDecoder("utf-8");
function encodeUtf8(str) {
  return TEXT_ENCODER.encode(str);
}
function decodeUtf8(bytes) {
  return TEXT_DECODER.decode(bytes);
}
function toBase64(bytes) {
  if (bytes.length === 0)
    return "";
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i2 = 0; i2 < bytes.length; i2++) {
    binary += String.fromCharCode(bytes[i2]);
  }
  return btoa(binary);
}
function fromBase64(b64) {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(b64, "base64"));
  }
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i2 = 0; i2 < binary.length; i2++) {
    bytes[i2] = binary.charCodeAt(i2);
  }
  return bytes;
}
function toAppleClientTime(date = /* @__PURE__ */ new Date()) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
function detectLocale() {
  const locale = typeof Intl !== "undefined" && Intl.DateTimeFormat().resolvedOptions().locale || "en-US";
  return locale.replace("-", "_");
}
function randomHex(byteLen, uppercase = false) {
  const bytes = new Uint8Array(byteLen);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    const nodeCrypto = (void 0)("crypto");
    const buf = nodeCrypto.randomBytes(byteLen);
    bytes.set(buf);
  }
  let hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return uppercase ? hex.toUpperCase() : hex;
}
function randomUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().toUpperCase();
  }
  const hex = randomHex(16);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    "4" + hex.slice(13, 16),
    (parseInt(hex[16], 16) & 3 | 8).toString(16) + hex.slice(17, 20),
    hex.slice(20, 32)
  ].join("-").toUpperCase();
}

// node_modules/@lbr77/anisette-js/dist/device.js
var DEFAULT_CLIENT_INFO = "<MacBookPro13,2> <macOS;13.1;22C65> <com.apple.AuthKit/1 (com.apple.dt.Xcode/3594.4.19)>";
var Device = class _Device {
  uniqueDeviceIdentifier;
  serverFriendlyDescription;
  adiIdentifier;
  localUserUuid;
  constructor(data) {
    this.uniqueDeviceIdentifier = data.UUID;
    this.serverFriendlyDescription = data.clientInfo;
    this.adiIdentifier = data.identifier;
    this.localUserUuid = data.localUUID;
  }
  /** Load from a parsed device.json object, or generate defaults if null. */
  static fromJson(json, overrides) {
    const defaults = _Device.generateDefaults();
    const base = json ?? {
      UUID: defaults.uniqueDeviceId,
      clientInfo: defaults.serverFriendlyDescription,
      identifier: defaults.adiId,
      localUUID: defaults.localUserUuid
    };
    if (overrides) {
      if (overrides.uniqueDeviceId)
        base.UUID = overrides.uniqueDeviceId;
      if (overrides.serverFriendlyDescription)
        base.clientInfo = overrides.serverFriendlyDescription;
      if (overrides.adiId)
        base.identifier = overrides.adiId;
      if (overrides.localUserUuid)
        base.localUUID = overrides.localUserUuid;
    }
    return new _Device(base);
  }
  /** Serialize back to the device.json wire format. */
  toJson() {
    return {
      UUID: this.uniqueDeviceIdentifier,
      clientInfo: this.serverFriendlyDescription,
      identifier: this.adiIdentifier,
      localUUID: this.localUserUuid
    };
  }
  static generateDefaults() {
    return {
      serverFriendlyDescription: DEFAULT_CLIENT_INFO,
      uniqueDeviceId: randomUUID(),
      adiId: randomHex(8, false),
      localUserUuid: randomHex(32, true)
    };
  }
};

// node_modules/@lbr77/anisette-js/dist/library.js
var LibraryStore = class _LibraryStore {
  libs;
  constructor(libs) {
    this.libs = libs;
  }
  static fromBlobs(storeservicescore, coreadi) {
    const map = /* @__PURE__ */ new Map();
    map.set("libstoreservicescore.so", storeservicescore);
    map.set("libCoreADI.so", coreadi);
    return new _LibraryStore(map);
  }
  get(name) {
    const data = this.libs.get(name);
    if (!data)
      throw new Error(`Library not loaded: ${name}`);
    return data;
  }
  get storeservicescore() {
    return this.get("libstoreservicescore.so");
  }
  get coreadi() {
    return this.get("libCoreADI.so");
  }
};

// node_modules/@lbr77/anisette-js/dist/http.js
var FetchHttpClient = class {
  async get(url, headers) {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`HTTP GET ${url} failed: ${response.status} ${response.statusText}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  }
  async post(url, body, headers) {
    const response = await fetch(url, { method: "POST", body, headers });
    if (!response.ok) {
      throw new Error(`HTTP POST ${url} failed: ${response.status} ${response.statusText}`);
    }
    return new Uint8Array(await response.arrayBuffer());
  }
};

// node_modules/@lbr77/anisette-js/dist/provisioning.js
var LOOKUP_URL = "https://gsa.apple.com/grandslam/GsService2/lookup";
var START_PROVISIONING_BODY = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Header</key>
  <dict/>
  <key>Request</key>
  <dict/>
</dict>
</plist>`;
var ProvisioningSession = class {
  bridge;
  device;
  http;
  urlBag = {};
  constructor(bridge, device, http) {
    this.bridge = bridge;
    this.device = device;
    this.http = http ?? new FetchHttpClient();
  }
  async provision(dsid) {
    if (Object.keys(this.urlBag).length === 0) {
      await this.loadUrlBag();
    }
    const startUrl = this.urlBag["midStartProvisioning"];
    const finishUrl = this.urlBag["midFinishProvisioning"];
    if (!startUrl)
      throw new Error("url bag missing midStartProvisioning");
    if (!finishUrl)
      throw new Error("url bag missing midFinishProvisioning");
    const startBytes = await this.http.post(startUrl, START_PROVISIONING_BODY, this.commonHeaders(true));
    const startPlist = parsePlist(startBytes);
    const spimB64 = plistGetStringInResponse(startPlist, "spim");
    const spim = fromBase64(spimB64);
    const { cpim, session } = this.bridge.startProvisioning(dsid, spim);
    const cpimB64 = toBase64(cpim);
    const finishBody = buildFinishBody(cpimB64);
    const finishBytes = await this.http.post(finishUrl, finishBody, this.commonHeaders(true));
    const finishPlist = parsePlist(finishBytes);
    const ptm = fromBase64(plistGetStringInResponse(finishPlist, "ptm"));
    const tk = fromBase64(plistGetStringInResponse(finishPlist, "tk"));
    this.bridge.endProvisioning(session, ptm, tk);
  }
  async loadUrlBag() {
    const bytes = await this.http.get(LOOKUP_URL, this.commonHeaders(false));
    const plist = parsePlist(bytes);
    const urls = plistGetDict(plist, "urls");
    this.urlBag = {};
    for (const [k, v] of Object.entries(urls)) {
      if (typeof v === "string")
        this.urlBag[k] = v;
    }
  }
  commonHeaders(includeTime) {
    const headers = {
      "User-Agent": "akd/1.0 CFNetwork/1404.0.5 Darwin/22.3.0",
      "Content-Type": "application/x-www-form-urlencoded",
      Connection: "keep-alive",
      "X-Mme-Device-Id": this.device.uniqueDeviceIdentifier,
      "X-MMe-Client-Info": this.device.serverFriendlyDescription,
      "X-Apple-I-MD-LU": this.device.localUserUuid,
      "X-Apple-Client-App-Name": "Setup"
    };
    if (includeTime) {
      headers["X-Apple-I-Client-Time"] = toAppleClientTime();
    }
    return headers;
  }
};
function parsePlist(bytes) {
  const xml = new TextDecoder("utf-8").decode(bytes);
  return parsePlistDict(xml);
}
function parsePlistDict(xml) {
  const result = {};
  const keyRe = /<key>([^<]*)<\/key>\s*(<string>([^<]*)<\/string>|<dict>([\s\S]*?)<\/dict>)/g;
  let m;
  while ((m = keyRe.exec(xml)) !== null) {
    const key = m[1];
    if (m[3] !== void 0) {
      result[key] = m[3];
    } else if (m[4] !== void 0) {
      result[key] = parsePlistDict(m[4]);
    }
  }
  return result;
}
function plistGetStringInResponse(plist, key) {
  const response = plist;
  const value = response[key];
  if (typeof value !== "string") {
    throw new Error(`plist Response missing string field: ${key}`);
  }
  return value;
}
function plistGetDict(plist, key) {
  const value = plist[key];
  if (!value || typeof value === "string") {
    throw new Error(`plist missing dict field: ${key}`);
  }
  return value;
}
function buildFinishBody(cpimB64) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Header</key>
  <dict/>
  <key>Request</key>
  <dict>
    <key>cpim</key>
    <string>${cpimB64}</string>
  </dict>
</dict>
</plist>`;
}

// node_modules/@lbr77/anisette-js/dist/anisette.js
var DEFAULT_DSID = BigInt(-2);
var DEFAULT_LIBRARY_PATH = "./anisette/";
var MD_RINFO = "17106176";
var Anisette = class _Anisette {
  bridge;
  device;
  provisioning;
  dsid;
  provisioningPath;
  libraryPath;
  libs;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wasmModule;
  identifier;
  httpClient;
  constructor(bridge, device, provisioning, dsid, provisioningPath, libraryPath, libs, wasmModule, identifier, httpClient) {
    this.bridge = bridge;
    this.device = device;
    this.provisioning = provisioning;
    this.dsid = dsid;
    this.provisioningPath = provisioningPath;
    this.libraryPath = libraryPath;
    this.libs = libs;
    this.wasmModule = wasmModule;
    this.identifier = identifier;
    this.httpClient = httpClient;
  }
  // ---- factory methods ----
  /**
   * Initialize from the two Android .so library files.
   * @param storeservicescore - bytes of libstoreservicescore.so
   * @param coreadi           - bytes of libCoreADI.so
   */
  static async fromSo(storeservicescore, coreadi, wasmModule, options = {}) {
    const libs = LibraryStore.fromBlobs(storeservicescore, coreadi);
    return _Anisette._init(libs, wasmModule, options);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async _init(libs, wasmModule, options) {
    const bridge = new WasmBridge(wasmModule);
    const initOpts = options.init ?? {};
    const libraryPath = normalizeAdiPath(initOpts.libraryPath ?? DEFAULT_LIBRARY_PATH);
    const provisioningPath = normalizeAdiPath(initOpts.provisioningPath ?? libraryPath);
    const dsid = options.dsid ?? DEFAULT_DSID;
    mountIdbfsPaths(bridge, libraryPath, provisioningPath);
    try {
      await bridge.syncIdbfsFromStorage();
    } catch (err2) {
      console.log("[anisette] Failed to sync IDBFS from storage:", err2);
    }
    const savedDeviceJson = parseDeviceJsonBytes(initOpts.deviceJsonBytes) ?? readDeviceJsonFromVfs(bridge, joinPath(libraryPath, "device.json"));
    const device = Device.fromJson(savedDeviceJson, initOpts.deviceConfig);
    const identifier = initOpts.identifier ?? device.adiIdentifier;
    if (initOpts.adiPb) {
      bridge.writeVirtualFile(joinPath(provisioningPath, "adi.pb"), initOpts.adiPb);
    }
    const deviceJsonBytes = initOpts.deviceJsonBytes ?? encodeUtf8(JSON.stringify(device.toJson(), null, 2));
    bridge.writeVirtualFile(joinPath(libraryPath, "device.json"), deviceJsonBytes);
    bridge.initFromBlobs(libs.storeservicescore, libs.coreadi, libraryPath, provisioningPath, identifier);
    const provisioning = new ProvisioningSession(bridge, device, options.httpClient);
    return new _Anisette(bridge, device, provisioning, dsid, provisioningPath, libraryPath, libs, wasmModule, identifier, options.httpClient);
  }
  // ---- public API ----
  /** Whether the device is currently provisioned. */
  get isProvisioned() {
    return this.bridge.isMachineProvisioned(this.dsid);
  }
  /** Run the provisioning flow against Apple servers. */
  async provision() {
    await this.provisioning.provision(this.dsid);
    if (this.bridge.isIdbfsAvailable()) {
      try {
        await this.bridge.syncIdbfsToStorage();
      } catch (err2) {
        console.error("[anisette] Failed to sync to IDBFS:", err2);
      }
    }
  }
  /** Read adi.pb from the WASM VFS for persistence. */
  getAdiPb() {
    return this.bridge.readVirtualFile(joinPath(this.provisioningPath, "adi.pb"));
  }
  /** Generate Anisette headers. Throws if not provisioned. */
  async getData() {
    const adiPb = readOptionalFile(this.bridge, joinPath(this.provisioningPath, "adi.pb"));
    const deviceJsonBytes = encodeUtf8(JSON.stringify(this.device.toJson(), null, 2));
    this.bridge = new WasmBridge(this.wasmModule);
    if (this.bridge.isIdbfsAvailable()) {
      mountIdbfsPaths(this.bridge, this.libraryPath, this.provisioningPath);
      try {
        await this.bridge.syncIdbfsFromStorage();
      } catch {
      }
    }
    if (adiPb) {
      this.bridge.writeVirtualFile(joinPath(this.provisioningPath, "adi.pb"), adiPb);
    }
    this.bridge.writeVirtualFile(joinPath(this.libraryPath, "device.json"), deviceJsonBytes);
    this.bridge.initFromBlobs(this.libs.storeservicescore, this.libs.coreadi, this.libraryPath, this.provisioningPath, this.identifier);
    this.provisioning = new ProvisioningSession(this.bridge, this.device, this.httpClient);
    const { otp, machineId } = this.bridge.requestOtp(this.dsid);
    const now = /* @__PURE__ */ new Date();
    const tzOffset = -now.getTimezoneOffset();
    const tzSign = tzOffset >= 0 ? "+" : "-";
    const tzHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, "0");
    const tzMins = String(Math.abs(tzOffset) % 60).padStart(2, "0");
    const timezone = `${tzSign}${tzHours}${tzMins}`;
    return {
      "X-Apple-I-Client-Time": toAppleClientTime(now),
      "X-Apple-I-MD": toBase64(otp),
      "X-Apple-I-MD-LU": this.device.localUserUuid,
      "X-Apple-I-MD-M": toBase64(machineId),
      "X-Apple-I-MD-RINFO": MD_RINFO,
      "X-Apple-I-SRL-NO": "0",
      "X-Apple-I-TimeZone": timezone,
      "X-Apple-Locale": detectLocale(),
      "X-MMe-Client-Info": this.device.serverFriendlyDescription,
      "X-Mme-Device-Id": this.device.uniqueDeviceIdentifier
    };
  }
  /** Serialize device.json bytes for persistence. */
  getDeviceJson() {
    return encodeUtf8(JSON.stringify(this.device.toJson(), null, 2));
  }
  /** Expose the device for inspection. */
  getDevice() {
    return this.device;
  }
};
function joinPath(base, file) {
  const b = base.endsWith("/") ? base : `${base}/`;
  return `${b}${file}`;
}
function normalizeAdiPath(path) {
  const trimmed = path.trim().replace(/\\/g, "/");
  if (!trimmed || trimmed === "." || trimmed === "./" || trimmed === "/") {
    return "./";
  }
  const noTrail = trimmed.replace(/\/+$/, "");
  if (!noTrail || noTrail === ".") {
    return "./";
  }
  if (noTrail.startsWith("./") || noTrail.startsWith("../")) {
    return `${noTrail}/`;
  }
  if (noTrail.startsWith("/")) {
    return `.${noTrail}/`;
  }
  return `./${noTrail}/`;
}
function mountIdbfsPaths(bridge, libraryPath, provisioningPath) {
  const paths = /* @__PURE__ */ new Set([libraryPath, provisioningPath]);
  for (const path of paths) {
    bridge.initIdbfs(path);
  }
}
function readOptionalFile(bridge, path) {
  try {
    return bridge.readVirtualFile(path);
  } catch {
    return null;
  }
}
function parseDeviceJsonBytes(bytes) {
  if (!bytes) {
    return null;
  }
  try {
    return JSON.parse(decodeUtf8(bytes));
  } catch {
    return null;
  }
}
function readDeviceJsonFromVfs(bridge, path) {
  const bytes = readOptionalFile(bridge, path);
  if (!bytes) {
    return null;
  }
  return parseDeviceJsonBytes(bytes);
}
export {
  Anisette,
  anisette_rs_default as ModuleFactory,
  WasmBridge
};
