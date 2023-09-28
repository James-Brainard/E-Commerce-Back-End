const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const findAllTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(findAllTags)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const findOneTag = await Tag.findOne({
      include: [{ model: Product }]
    })
    res.status(200).json(findOneTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createNewTag = await Tag.create(req.body);
    res.status(200).json(createNewTag);
  } catch(err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
  } catch(err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTagById = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteTagById) {
      res.status(400).json({ message: 'No Tag found with this id!'});
      return;
    }
  } catch(err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;