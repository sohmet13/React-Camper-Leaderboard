class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: ''};
    this.onSort = this.onSort.bind(this);
  }
  getData() {
 fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  componentDidMount() {
    this.getData();
  }
  onSort(sortKey){
    const sort = this.state.data;
    sort.sort((a,b) => b[sortKey]-a[sortKey])
    this.setState({data: sort})
  }

  render() {
    const data = this.state.data
    let i, count=1;
    if  (typeof data == 'object'){
      i = data.map((a) => 
       <tr>
         <td className='id'>{count++}</td>
         <td className='name'><img src={a.img}/>{a.username}</td>
         <td className='days text-center'>{a.recent}</td>
         <td className='all text-center'>{a.alltime}</td>
       </tr>
    )}
    
    return (
        <table>
          <caption className='text-center'>Leaderboard</caption>
          <tr id='first'>
            <th className='id'>#</th>
            <th className='name'>Camper Name</th>
            <th className='days text-center' onClick={() => this.onSort('recent')}>Points in past 30 days</th>
            <th className='all text-center' onClick={() => this.onSort('alltime')}>All time points</th>
          </tr>
            {i}
        </table>
    );
  }
}

ReactDOM.render(<Table />, document.getElementById("app"));

