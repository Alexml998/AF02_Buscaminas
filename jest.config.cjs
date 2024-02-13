/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    transformIgnorePatterns: [
      '/node_modules/(?!(@uidotdev/usehooks)/)'
    ],
    "moduleNameMapper": {
      "^.+\\.(css|less|scss|png|mp3)$": "babel-jest"
    }
  };
};
