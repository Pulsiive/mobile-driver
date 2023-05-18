import * as React from 'react';
import * as RN from 'react-native';

class MyCalendar extends React.Component {
  months = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];
  weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  event = [18, 20, 21, 22, 23, 24, 25];

  ////////////////////////////////////////////////////////
  generateMatrix() {
    var matrix = [];
    // The following code creates the header
    matrix[0] = this.weekDays;

    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 0).getDay();

    var maxDays = this.nDays[month];
    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  ////////////////////////////////////////////////////////
  state = {
    activeDate: this.props.date.date
  };

  _onPress = (item) => {
    this.setState(() => {
      if (!item.match && item !== -1) {
        this.state.activeDate.setDate(item);
        this.props.open(false);
        this.props.onChange(this.state.activeDate.toISOString());
        return this.state;
      }
    });
  };
  changeMonth = (n) => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };

  render() {
    var matrix = this.generateMatrix();
    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        return (
          <RN.Text
            style={{
              flex: 1,
              height: 18,
              textAlign: 'center',
              backgroundColor:
                rowIndex === 0
                  ? '#ddd'
                  : this.event.includes(item) && this.state.activeDate.getMonth() === 4
                  ? 'red'
                  : '#fff',
              color: item === this.state.activeDate.getDate() ? '#7FCB2B' : 'black',
              fontWeight: item === this.state.activeDate.getDate() ? 'bold' : '500'
            }}
            onPress={() => this._onPress(item)}
          >
            {item !== -1 ? item : ''}
          </RN.Text>
        );
      });
      return (
        <RN.View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {rowItems}
        </RN.View>
      );
    });
    return (
      <RN.View>
        <RN.Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: 'white'
          }}
        >
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </RN.Text>
        {rows}
        <RN.Button title="<" onPress={() => this.changeMonth(-1)} />
        <RN.Button title=">" onPress={() => this.changeMonth(+1)} />
      </RN.View>
    );
  }
}

// Export for now to get rid of error and see preview:
export default MyCalendar;
