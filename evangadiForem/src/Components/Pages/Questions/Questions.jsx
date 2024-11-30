
import styles from "./Questions.module.css";
import useAddQuestions from "../../hooks/useAddQuestions";
function Questions() {
const { title, setTitle, desc, setDesc,err, addQuestions}=useAddQuestions()




  return (
    <div className={styles.question_wrapper}>
      <div className={styles.question_container}>
        <div className={styles.stpess}>
          <h2 className={styles.step_headline}>
            steps to write a good questions
          </h2>
          <div className={styles.headline_border}></div>
          <ul>
            <li>summerize your problem in one-line title</li>
            <li> describe your detail in more detail</li>
            <li>
              descrive what your are tried and what you expected to happen
            </li>
            <li> review your question and post it here</li>
          </ul>
        </div>
        <div className={styles.question_form}>
          <h3 className="text-center mb-3">Post Your Questions</h3>
          <form onSubmit={addQuestions}>
            <div className="form-group">
              <input
                type="text"
                class="form-control"
                id="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ border: `2px solid ${err}` }}
              />
            </div>

            <div
              className="form-group"
            
            >
              <textarea
                className="form-control"
                rows="5"
                id="details"
                placeholder="Details"
                name=" descrbition"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ border: `2px solid ${err}` }}
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Questions;
