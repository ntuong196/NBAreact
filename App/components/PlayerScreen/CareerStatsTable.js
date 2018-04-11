import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import TeamMap from '../../utils/TeamMap'

class CareerStatsTable extends Component<Props> {

  constructor(props) {
    super(props)
  }

  createHeader = () => {
    return [
      'Season',
      'Team',
      'GP',
      'MIN',
      'PTS',
      'FGM',
      'FGA',
      'FG %',
      '3PM',
      '3PA',
      '3P%',
      'FTM',
      'FTA',
      'FT%',
      'OREB',
      'DREB',
      'REB',
      'AST',
      'TOV',
      'STL',
      'BLK',
      'PF',
      'DD',
      'TD',
      '+/-'
    ]
  }

  createYearMap = (year) => {
    return [
      `${year.group_value}`,
      `${year.team_abbreviation}`,
      `${year.gp}`,
      `${year.min}`,
      `${year.pts}`,
      `${year.fgm}`,
      `${year.fga}`,
      `${year.fg_pct}`,
      `${year.fg3m}`,
      `${year.fg3a}`,
      `${year.fg3_pct}`,
      `${year.ftm}`,
      `${year.fta}`,
      `${year.ft_pct}`,
      `${year.oreb}`,
      `${year.dreb}`,
      `${year.reb}`,
      `${year.ast}`,
      `${year.tov}`,
      `${year.stl}`,
      `${year.blk}`,
      `${year.pf}`,
      // `${year.nba_fantasy_points}`,
      `${year.dd2}`,
      `${year.td3}`,
      `${year.plus_minus}`,
    ]
  }

  _renderYearByYear = () => {
    let stats = this.props.stats.ByYearPlayerDashboard
    const header = this.createHeader()

    if (stats[0].group_value) {
      stats.unshift(header)
    }

    return (
      <FlatList
        data={stats}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderYear}
      />
    )
  }

  _renderYear = (year) => {
    year = year.item
    const yearArray = year.group_value !== undefined ? this.createYearMap(year) : year

    return (
      <View style={styles.row}>
        {
          yearArray.map((stat, index) => {
            const width = index === 0 ? 80 : 50
            const border = index < 24 ? { borderRightWidth: 1, borderRightColor: '#D3D3D3' } : { }
            return (
              <View style={[styles.defaultCenteredView, { width: width, height: 40 }, border ]} key={index}>
                <Text style={styles.text}> {stat} </Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  _keyExtractor = (year) => {
    return year.group_value || '_' + Math.random().toString(36).substr(2, 9)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        {
          this._renderYearByYear()
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontSize: 14
  },
  row: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3'
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    teamID: state.scores.selectedTeam.teamID,
    player: state.scores.selectedPlayer.player
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CareerStatsTable)
