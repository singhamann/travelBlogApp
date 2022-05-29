import { useParams } from 'react-router-dom'
import DashboardItem from '../containers/DashboardItem'
export default function Dashboard(){
    const {userId} = useParams()
    return ( <>
        <DashboardItem userId={userId}/>
        </>
    )
}