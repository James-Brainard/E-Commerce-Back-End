const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const findAllTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    return res.status(200).json(findAllTags)
  } catch (err) {
    return res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const findOneTag = await Tag.findByPk(req.params.id,{
      include: [{ model: Product }]
    });
    if (!findOneTag) {
      res.status(400).json({ message: 'No Tag found with this id!'});
      return;
    }
    return res.status(200).json(findOneTag);
  } catch (err) {
    return res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createNewTag = await Tag.create(req.body);
    return res.status(200).json(createNewTag);
  } catch(err) {
    return res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTagById = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTagById) {
      return res.status(400).json({ message: 'No Tag with this id!'})
      return;
    }
    return res.status(200).json(updateTagById);
  } catch(err) {
    return res.status(500).json(err);
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
    return res.status(200).json(deleteTagById);
  } catch(err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;