const resolvers = {
  Query: {
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    }
  },
  Mutation: {
    async createLink(root, { url, slug }, { models }) {
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
