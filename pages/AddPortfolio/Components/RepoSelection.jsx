
function RepoSelection({ repoList, setSelectedIndex, selectedIndex }) {
    return (
        <>
            <select onChange={(e)=>setSelectedIndex(Number(e.target.value))} value={selectedIndex}>
            {
                repoList.map((item, i) => {
                return (
                    <option key={item.name} value={i}>{item.name}</option>
                )
            })}
            </select>
        </>
    )
}
export default RepoSelection