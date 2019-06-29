import { Router } from "express";
import auth from "./auth/auth.routes";
import users from './user/user.routes';
import games from './game/game.routes';

const router: Router = Router();

// router.use("/env", (req, res) => {
//   res.json(process.env);
// });
router.use("/authentication", auth);
router.use("/users", users);
router.use("/games", games);

export default router;
