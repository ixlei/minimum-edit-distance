function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    
    //if a = NaN, a !== a is true
    if(a !== a && b !== b) {
      return true;
    }

    if (a === null || b === null) {
      return false;
    }

    if (isFunction(a)) {
      if (isFunction(b)) {
        return a.toString() === b.toString();
      }
      return false;
    }

    if (isObject(a) && isObject(b)) {
      if (Array.isArray(a)) {
        if (Array.isArray(b)) {
          var lena = a.length;
          if (lena === b.length) {
            for (var i = 0; i < lena; i++) {
              if (!deepEqual(a[i], b[i])) {
                return false;
              }
            }
            return true;
          }
          return false;
        }
        return false;
      }

      if (isDate(a)) {
        if (isDate(b)) {
          return a.getTime() === b.getTime();
        }
        return false;
      }

      if (isRegExp(a)) {
        if (isRegExp(b)) {
          return a.toString() === b.toString() && a.lastIndex === b.lastIndex;
        }
        return false;
      }

      if (isDeepObject(a)) {
        if (isDeepObject(b)) {
          for (var key in a) {
            if (!deepEqual(a[key], b[key])) {
              return false;
            }
          }

          for (var key in b) {
            if (!deepEqual(a[key], b[key])) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
    }
    return false;
}

function isFunction(a) {
	return typeof a  === 'function';
}

function isObject(a) {
	return a !== null &&  typeof a === 'object';
}

function isRegExp(a) {
	return Object.prototype.toString.call(a) === '[object RegExp]';
}

function isDate(a) {
	return Object.prototype.toString.call(a) === '[object Date]';
}

function isDeepObject(a) {
	return Object.prototype.toString.call(a) === '[object Object]';
}

export default deepEqual;
