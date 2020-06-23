import React,{useState} from 'react';
import {Link} from 'react-router-dom';

export const AddTalk  = () => {
    const [show_list,setShowList] = useState(false);
    return(
        <div class="container">
            <section className="tab-header-section">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                            onClick={()=>setShowList(false)}
                        >Add New Talk</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                            onClick={()=>setShowList(true)}
                        >See Talk Lists</button>
                    </div>
                </div>
            </section>
            {
                show_list === false ? <AddTalkForm /> : <ShowTalkList />
            }
        </div>
    );
}

const ShowTalkList = () => {
    return(
        <section>
            <table className="table">
                <thead>
                    <th>Talk Title</th>
                    <th>Speaker Name</th>
                    <th>Attendees</th>
                    <th>Location</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    <tr>
                        <td>How to Be Great</td>
                        <td>Moshood Oseni</td>
                        <td>100,000</td>
                        <td>Lagos, Nigeria</td>
                        <td>
                            <Link to="/add_attendees" className="btn btn-primary">Add Attendees</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

const AddTalkForm = () => {
    return(
        <section className="tab-body-section">
                <form method="POST">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Talk Title *</label>
                                <input 
                                    className="form-control" 
                                    value=""
                                    placeholder="Enter Talk Title"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Speaker Name *</label>
                                <input 
                                    className="form-control" 
                                    value=""
                                    placeholder="Enter Speaker Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Time Allocated *</label>
                                <input 
                                    type="input"
                                    className="form-control" 
                                    value=""
                                    placeholder="Allocate time"
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Location*</label>
                                <input 
                                    className="form-control" 
                                    value=""
                                    placeholder="Location"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row text-center">
                        <button class="btn btn-primary submit_btn">Submit</button>
                    </div>
                </form>
            </section>
    )
}

export const Header = () => (
    <header>
        <nav>
            <ul class="nav-item">
                <li><Link to="/add_talk">Add Talk</Link></li>
                <li><Link to="/add_attendees">Add Attendees</Link></li>
            </ul>
        </nav>
    </header>
) 