# ONT ID app demo

A Ontology sign in demo, written in Vue.js

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

## Integrating Ontology account sign-in into your app.

### 1. Add the specifi meta tag in the `header` tag. 

The content should be `{your app's ONT ID}@{your app's name}`. For example:

```
    <meta name="ontology-app-ontid" content="did:ont:AS8u44muJGYe6grnUEuCevbP4kHreYZKJR@AwesomAPP">

```

### 2. Import the `plugin.js`. (Will put it on the CDN soon.)

```
    <script src="./plugin.js"></script>
```

### 3. Add the sign in button on your page where you want the user to click. 

* The class name `ontid-signin` is required, which defines the default button style, and you can add other classes if you need so.
* The attribute `data-onsuccess` is required, which defines the callback function and it will be called after the user sign in with Ontology successfully.
* About how to get the response of the sign in, you can define a global function called onLoginSuccess, or you can assign the the function to any value you want. Please refer to this demo.
* 

```
<button class="ontid-signin some-other-class" data-onsuccess="onLoginSuccess">Sign in with Ontology</button>
```
