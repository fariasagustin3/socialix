import Cancel from '@mui/icons-material/Cancel';
import './noResponsive.css'

export default function NoResponsive() {
  return (
    <div className='noResponsiveContainer'>
      <div className='noResponsiveTitleContainer'>
        <Cancel className='cancelIcon' />
        <h1 className='noResponsiveTitle'>You cannot see this web application in your mobile device</h1>
      </div>
    </div>
  )
}
