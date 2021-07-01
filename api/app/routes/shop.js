const router = require("express").Router();
const { Carrito } = require("../../db/models");

//traigo todos los carritos de un usuario
router.get("/", (req, res, next) => {
    Carrito.findOne({where:{userId:req.user.dataValues.id,/* state:'pending' */}})
        .then((Carrito) => {
            res.status(200).json(Carrito);
        })
        .catch(next);
});

//AGERGO un nuevo objeto al carrito o lo CREO si ya existe
router.post("/add", async (req, res, next) => {
    try {
        const product = req.body;
        const userId = req.user.dataValues.id;
        const [carrito, created] = await Carrito.findOrCreate({
            where: { userId },
        });
        carrito.arrayOfProducts = [...carrito.arrayOfProducts, product];
        await carrito.save();
        if (created) res.status(201).json(carrito);
        res.status(200).json(carrito);
    } catch (err) {
        next(err);
    }
});

//ELIMINO un producto
router.delete("/:productId", (req, res, next) => {
    Carrito.findOne({ where: { userId: req.user.dataValues.id } })
        .then((carrito) => {
            const clone=carrito.arrayOfProducts
            const indexDelete = clone.findIndex(
                (product) => {
                    return product.id === parseInt(req.params.productId)
                }
            );
            clone.splice(indexDelete, 1);
            return carrito.update({...carrito,arrayOfProducts:clone})
        }).then((carritoUpdated) => {
            res.status(204).json(carritoUpdated)
        })
        .catch(next);
});


module.exports = router;