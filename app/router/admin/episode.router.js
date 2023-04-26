const {
  EpisodeController,
} = require("../../http/controller/admin/course/episode.controller");
const { videoFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", videoFile.single("video"), EpisodeController.addEpisode);
router.patch(
  "/update/:episodeID",
  videoFile.single("video"),
  EpisodeController.updateEpisode
);
router.delete("/delete/:episodeID", EpisodeController.deleteEpisode);
module.exports = { EpisodeRoutes: router };
