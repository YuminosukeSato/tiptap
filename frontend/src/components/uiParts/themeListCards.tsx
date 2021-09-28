import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import moment from 'moment'
import React, { FC, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TimeCalService } from 'src/services/timeCalService'

import { SearchedThemes } from '../../domain/postThemes'
import { Routes } from '../../domain/router'
import Themes from '../../utils/theme'
import { ThemeListContext } from '../pages/themes'
import CompetitionLabel from '../uiParts/competitionLabel'

const useStyles = makeStyles({
   card: {
      fontFamily: Themes.font.fontFamily,
      minWidth: 345,
      width: '70%',
      margin: '4px',
   },
   disableCard: {
      fontFamily: Themes.font.fontFamily,
      background: Themes.color.disableColor,
      minWidth: 345,
      width: '70%',
      margin: '4px',
   },
   title: {
      fontFamily: Themes.font.fontFamily,
      fontSize: 20,
      fontWeight: 'bold',
      display: 'flex',
   },
   totalCount: {
      display: 'flex',
      marginRight: 'auto',
   },
   closeTime: {
      fontFamily: Themes.font.fontFamily,
   },
   competitionIcon: {
      display: 'flex',
      alignItems: 'center',
      padding: '3px',
      fontSize: '15px',
      borderRadius: '5px',
      marginLeft: 'auto',
      color: '#fff',
      background: 'red',
   },
})

type LeftTimeProps = {
   isClose: boolean
   displayTime: string
}

const object = {
   isClose: false,
   displayTime: '',
}
const ThemeListCards: FC = () => {
   const classes = useStyles()
   const history = useHistory()
   const [leftTime, setLeftTime] = useState<LeftTimeProps>(object)
   const timeCalService = new TimeCalService()
   const { themeList } = useContext(ThemeListContext)
   console.log(themeList)

   // useEffect(() => {
   //    setInterval(intervalCount, 1000)
   // }, [])

   return (
      <>
         {themeList.searched_themes.map((value: SearchedThemes) => {
            const leftTime = timeCalService.DisplayLeaveTime(value.close_time)
            return (
               <Card
                  className={
                     value.is_closed ? classes.card : classes.disableCard
                  }
                  key={value.id}
                  onClick={() => {
                     history.push(Routes.themes.path + '/' + String(value.id))
                  }}
               >
                  <CardContent>
                     <Typography className={classes.title}>
                        <div>{value.name}</div>
                        {value.rooms_num !== 1 && (
                           <div className={classes.competitionIcon}>
                              <DirectionsRunIcon />
                              競争
                           </div>
                        )}
                     </Typography>
                     <Typography className={classes.closeTime}>
                        {value.is_closed && !leftTime.isClose ? (
                           <>{leftTime.displayTime}</>
                        ) : (
                           <>終了</>
                        )}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Typography className={classes.totalCount}>
                        トータルカウント：{value.total_counts}
                     </Typography>
                  </CardActions>
               </Card>
            )
         })}
      </>
   )
}

export default ThemeListCards
