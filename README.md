<h1 align="center">Welcome to get-oauth-token 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/get-oauth-token" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/get-oauth-token" />
  </a>
  <a href="https://github.com/theBenForce/get-oauth-token/actions/workflows/release.yml">
    <img alt="Release Actions" src="https://github.com/theBenForce/get-oauth-token/actions/workflows/release.yml/badge.svg" />
  </a>
  <a href="https://github.com/theBenForce/get-oauth-token/blob/main/README.md" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/theBenForce" target="_blank">
    <img alt="Twitter: theBenForce" src="https://img.shields.io/twitter/follow/theBenForce.svg?style=social" />
  </a>
</p>

> Run an OAuth login flow and display the final token

### 🏠 [Homepage](https://github.com/theBenForce/get-oauth-token)

## Install

```sh
yarn global add get-oauth-token
```

## Usage

Once the package is installed globally, you can see the current list of commands
by running `oauth help`.

### Adding a Profile

This tool relies on creating a `.oauthrc` file in your user directory which
will contain a profile for each location that you want to get a token from. To
create a new profile, run:

```bash
oauth new-profile
```

And the cli will step you through a series of questions to create a new profile.

### Getting a Token

To use the CLI to get a token, run the login command and provide a profile name.

```bash
oauth login test-profile
```

This will open a browser and start the login flow. At the end of the flow you'll
see a webpage with the ID Token and some links to view it on jwt.io or copy.

## Author

👤 **Ben Force**

* Website: https://www.thebenforce.com/
* Twitter: [@theBenForce](https://twitter.com/theBenForce)
* Github: [@theBenForce](https://github.com/theBenForce)
* LinkedIn: [@theBenForce](https://linkedin.com/in/theBenForce)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/theBenForce/get-oauth-token/issues). 

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.buymeacoffee.com/theBenForce" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
