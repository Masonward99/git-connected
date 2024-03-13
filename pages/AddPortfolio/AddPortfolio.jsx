import Modal from "react-modal"
import { useEffect, useState } from "react";
import { addPortfolioRepo, getRepoList } from "../../functions";
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import RepoSelection from "./Components/RepoSelection";

function AddPortfolio({ isOpen, setIsOpen }) {
    const {user} = useContext(UserContext)
    const [repoList, setRepoList] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [description, setDescription] = useState('')
    console.log(selectedIndex)
    useEffect(() => {
      getRepoList(user.username).then((repos) => setRepoList(repos));
    }, []);
    if (repoList.length > 1) {
        console.log(repoList[selectedIndex].owner.login)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        addPortfolioRepo(repoList[selectedIndex].owner.login, repoList[selectedIndex].html_url, repoList[selectedIndex].name, description, user.id)
        setIsOpen(false)
    }
    function onClose() {
        setSelectedIndex(0)
        setDescription('')
    }
    return (
        <Modal isOpen={isOpen} onAfterClose={onClose}>
            <button onClick={() => setIsOpen(false)}>close</button>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <RepoSelection repoList={repoList} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
                {repoList.length > 0 ?
                    <>
                        <label>
                            Username:
                            <input type="text" readOnly={true} value={repoList[selectedIndex].owner.login}/>
                        </label>
                        <label>
                            Url:
                            <input type="text" readOnly={true} value={repoList[selectedIndex].html_url}/>
                        </label>
                        <label>
                            Name:
                            <input type="text" readOnly={true} value={repoList[selectedIndex].name}/>
                        </label>
                        <label>
                            Description:
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>
                        </label>
                        <button type="submit">Post project</button>
                    </>
                    : null
                }
            </form>
        </Modal>
    )
}
export default AddPortfolio