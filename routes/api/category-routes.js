const router = require('express').Router();
const { find } = require('lodash');
const { Category, Product } = require('../../models');
const { update } = require('../../models/category');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const findAllCategory = await Category.findAll({
      include: [{ model: Product }]
    });
    return res.status(200).json(findAllCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const findCategoryId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!findCategoryId) {
      res.status(400).json({ message: 'No category found with this id!'});
      return;
    }
    return res.status(200).json(findCategoryId)
  } catch (err) {
    return res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategoryById = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategoryById) {
      res.status(400).json({ message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(updateCategoryById);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(400).json({ message: 'No category found with this id!'});
      return;
    }
    return res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;