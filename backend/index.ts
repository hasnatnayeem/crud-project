import app from './app'
import * as http from 'http'
import { port } from './common/common.config'

const server: http.Server = http.createServer(app)

export default server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

