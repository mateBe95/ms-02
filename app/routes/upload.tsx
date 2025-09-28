import FileUploadComponent from "~/components/FileUploader/FileUploader";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Upload() {
    return <div>
        <FileUploadComponent />
    </div>;
}
