const { UserInputError } = require("apollo-server");

const resolvers = {
  Query: {
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    }
  },
  Mutation: {
    async createLink(root, { url, slug }, { models }) {
      let allLinks = await models.Link.findAll();

      let allSlugs = [];
      allLinks.forEach((item) => {
        allSlugs.push(item.dataValues.slug);
        if (item.dataValues.slug === slug) {
          console.log("SLUG ALREADY EXISTS");
          //slug already exists - throw error and exit.
          //https://www.apollographql.com/docs/apollo-server/data/errors/
          throw new UserInputError("Slug already Exists", {
            invalidArgs: Object.keys(slug)
          });
        }
      });

      console.log(allSlugs);

      let verifiedUrl = new URL(url);
      let baseUrl = verifiedUrl.host;

      let generatedSlug = "";
      if (slug === "") {
        //if user did not specify a custom slug, generate one
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 4; i++)
          generatedSlug += charset.charAt(
            Math.floor(Math.random() * charset.length)
          );
        console.log(generatedSlug);
        slug = generatedSlug;
      }

      url = `${baseUrl}/${slug}`; //new url with slug addition

      return models.Link.create({
        url,
        slug
      });
    },

    deleteLink(root, { id }, { models }) {
      return models.Link.destroy({
        where: { id }
      });
    }
  }
};

module.exports = resolvers;
