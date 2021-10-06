import UpdateAppVersion from "./cmd/UpdateAppVersion";
import VPSManager from "./vps/VPSManager";
import DeployServer from "./cmd/DeployServer";

export default class DeployManager {

    async deployServer() {
        await new DeployServer().run()
    }

    async deleteServer(id: number) {
        await new VPSManager().deleteVPS(id);
    }

    async updateAppVersion() {
        await new UpdateAppVersion().run();
    }
}