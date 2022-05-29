import { useParams } from "react-router-dom"
import EditPlaceForm from "../containers/EditPlaceForm"
export default function EditPlace(){
    const {placeId} = useParams()
    return (<>
        <EditPlaceForm placeId= {placeId} />
    </>)
}