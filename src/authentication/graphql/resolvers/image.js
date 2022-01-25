import {parse, join} from 'path';
import {createWriteStream} from 'fs';
import {URL} from "../../../config";
import {GraphQLUpload} from "graphql-upload";

export default {
    Upload: GraphQLUpload,

    Query: {
        info: () => "Hello i am image resolver methods."
    },
    Mutation: {
        imageUploader: async (_, {file}) => {
            try {
                let {
                    filename,
                    createReadStream
                } = await file;
                let stream = createReadStream();

                let {
                    ext,
                    name
                } = parse(filename);

                name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

                let serverFile = join(__dirname, `../../../uploads/${name}-${Date.now()}${ext}`);

                let writeStream = await createWriteStream(serverFile);
                await stream.pipe(writeStream);

                let lastPath = serverFile.split('uploads')[1];
                lastPath = lastPath.replace('\\', '/');
                serverFile = `${URL}${lastPath}`;

                return serverFile;
            } catch (e) {
                console.log("ERROR UPLOAD A IMAGE", e);
                throw e;
            }
        }
    }
}