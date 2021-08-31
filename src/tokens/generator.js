const StyleDictionaryPackage = require('style-dictionary');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `config/brands/${brand}/*.json`,
      "config/globals/**/*.json",
      `config/platforms/${platform}/*.json`
    ],
    "platforms": {
      "web": {
        "transformGroup": "web",
        "buildPath": `dist/web/${brand}/`,
        "files": [{
          "destination": "config.scss",
          "format": "scss/variables"
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `dist/android/${brand}/`,
        "files": [{
          "destination": "config.colors.xml",
          "format": "android/colors"
        }, {
          "destination": "config.dimens.xml",
          "format": "android/dimens"
        }, {
          "destination": "config.font_dimens.xml",
          "format": "android/fontDimens"
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

// PROCESS THE DESIGN CONFIG FOR THE DIFFEREN BRANDS AND PLATFORMS

['brand-1', 'brand-2', 'brand-3'].map(function (brand) {
  ['web', 'ios', 'android'].map(function (platform) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

    StyleDictionary.buildPlatform(platform);

    console.log('\nEnd processing');

  })
})

console.log('\n==============================================');
console.log('\nBuild completed!');
