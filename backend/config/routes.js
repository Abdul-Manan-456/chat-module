"use-strict";

module.exports = (app) => {
  app.use("/api/v1/auth", require("../controllers/AuthController"));
  app.use("/api/v1/inbox", require("../controllers/InboxController"));
  app.use("/api/v1/chat", require("../controllers/chatController"));
  app.use("/api/v1/group", require("../controllers/groupController"));
  app.use("/api/v1/members", require("../controllers/memberController"));
  app.use("/api/v1/group/messages", require("../controllers/groupMessageController"));

};