const StyleDictionaryPackage = require('style-dictionary');
const del = require('del');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `config/brand/${brand}/*.json`,
      "config/global/**/*.json",
      `config/platforms/${platform}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `dist/web/${brand}/`,
        "files": [{
          "destination": "config.scss",
          "format": "scss/variables"
        }],
        "options": {
          "outputReferences": true
        }
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `dist/android/${brand}/`,
        "files": [{
          "destination": "config.colors.xml",
          "format": "android/colors"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": `dist/ios/${brand}/`,
        "files": [{
          "destination": "config.h",
          "format": "ios/macros"
        }]
      }
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN CONFIG FOR THE DIFFERENT BRANDS AND PLATFORMS

(async () => {

  const dir = "./dist"

  try {
    await del(dir);

    console.log(`Removed ${dir} folder`);
  } catch (err) {
    console.error(`Error while deleting ${dir} folder`);
  }
  ['bilbasen', 'dba'].map(function (brand) {
    console.log('\n==============================================');
    console.log(`\n${brand.toUpperCase()}`);

    ['web', 'ios', 'android'].map(function (platform) {
      const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));
      StyleDictionary.buildPlatform(platform);
    })
  })
  console.log('\n==============================================');
  console.log('\nBuild completed!\n');
})();
