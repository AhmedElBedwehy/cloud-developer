"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    app.get("/filteredimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        let { image_url } = req.query;
        // endpoint to filter an image from a public url.
        // IT SHOULD
        //    1. validate the image_url query
        if (!image_url) {
            return res.status(400)
                .send(`Image url is required`);
        }
        //    2. call filterImageFromURL(image_url) to filter the image
        const filteredpath = yield util_1.filterImageFromURL(image_url);
        //    3. send the resulting file in the response
        res.status(200).sendFile(filteredpath);
        //    4. deletes any files on the server on finish of the response
        res.on("finish", () => util_1.deleteLocalFiles([filteredpath]));
        // QUERY PARAMATERS
        //    image_url: URL of a publicly accessible image
        // RETURNS
        //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
        /**************************************************************************** */
    }));
    //! END @TODO1
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map