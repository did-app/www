(function functionName(global) {
  async function authenticate(client_id) {
    var location = new URL(window.location);
    location.hash = "";

    var { codeVerifier, codeChallenge } = await generatePKCE();
    var request = {
      client_id,
      redirect_uri: location.toString(),
      response_mode: "fragment",
      code_challenge: codeChallenge
    };

    var authenticationURL = "http://localhost:5000?" + paramsToSearch(request);

    var popup = global.open(authenticationURL);

    return new Promise(function(resolve, reject) {
      async function handleCode(event) {
        popup.close();

        const params = searchToParams(global.location.hash.substr(1));

        var tokenRequest = {
          code: params.code,
          client_id,
          code_verifier: codeVerifier
        };

        var response = await fetch("http://localhost:7000/oidc/token", {
          method: "POST",
          body: paramsToSearch(tokenRequest)
        });

        console.log(response);
        console.log(await response.json());
      }

      window.addEventListener("hashchange", handleCode, false);
    });
  }

  window.DID = { authenticate };

  // URL utils

  function searchToParams(string) {
    const urlParams = new URLSearchParams(string);
    const params = {};

    urlParams.forEach(function(value, key) {
      params[key] = value;
    });

    return params;
  }

  function paramsToSearch(params) {
    var searchParams = new URLSearchParams();
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.append(key, params[key]);
      }
    }
    return searchParams.toString();
  }

  // PKCE

  async function generatePKCE() {
    var seed = crypto.getRandomValues(new Uint8Array(32));
    var codeVerifier = arrayBufferToUrlBase64(seed);

    var hash = await crypto.subtle.digest("SHA-256", strToUint8(codeVerifier));
    var codeChallenge = arrayBufferToUrlBase64(new Uint8Array(hash));

    return { codeVerifier, codeChallenge };
  }

  // binary utils

  function arrayBufferToString(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
  }

  function arrayBufferToBase64(buffer) {
    return window.btoa(arrayBufferToString(buffer));
  }

  function arrayBufferToUrlBase64(buffer) {
    return arrayBufferToBase64(buffer)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  function strToUint8(str) {
    return new TextEncoder().encode(str);
  }
})(window);
