// import models
const Product = require('./product');
const Category = require('./category');
const Tag = require('./tag');
const ProductTag = require('./productTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
    unique: false,
    onDelete: 'SET NULL'
  }
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: 'tag_id',
    unique: false,
    ondelete: 'SET NULL'
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};