import React,{useState, useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import {ProcessPostRequest,base_url,ProcessGetRequest} from './HandlerComponent';
import {NotificationContainer, NotificationManager} from 'react-notifications';
export const AddTalk  = () => {
    const [show_list,setShowList] = useState(false);
    const [talks,setTalks] = useState([]);
    return(
        <div className="container">
            <section className="tab-header-section">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                            onClick={()=>setShowList(false)}
                        >Add New Talk</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                            onClick={()=>{
                                setShowList(true);
                                ProcessGetRequest('/api/get_talks').then(res =>{
                                    console.log(res);
                                    setTalks(res.talks);
                                }).catch(err =>{
                                    console.log(err);
                                });
                            }}
                        >See Talk Lists</button>
                    </div>
                </div>
            </section>
            {
                show_list === false ? <AddTalkForm /> : <ShowTalkList talks={talks} />
            }
        </div>
    );
}

const ShowTalkList = ({talks}) => {
    return(
        <section>
            <table className="table">
                <thead>
                    <tr>
                        <th>Talk Title</th>
                        <th>Speaker Name</th>
                        <th>Attendees</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        talks.map(function(talk,index){
                            return(
                                <tr key={index}>
                                    <td>{talk.talk_title}</td>
                                    <td>{talk.speaker_name}</td>
                                    <td>{ talk.attendees_id !== null && talk.attendees_id.trim ? 
                                        talk.attendees_id.split(',').length - 1 : 0}
                                    </td>
                                    <td>{talk.location}</td>
                                    <td>{talk.talk_date}</td>
                                    <td>
                                        <Link to={{
                                            pathname : `/add_attendee_talks/${talk.id}`,
                                        }} className="btn btn-primary">Add Attendees</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}


export const AddAttendeesList = ({attendees,talk_id,setTalk,talk}) => {
    console.log(talk);
    return(
        <section>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        {talk_id.trim() !== '' && <th>Select</th> }
                    </tr>
                </thead>
                <tbody>
                    {
                        attendees.map(function(attendee,index){
                            return(
                                <tr key={index}>
                                    <td>{attendee.full_name}</td>
                                    <td>{attendee.email}</td>
                                    {
                                        talk_id.trim() !== '' && <td>
                                        <button
                                            onClick={()=>{
                                                let request_data = {
                                                    talk_id,
                                                    attendee_id :attendee.id
                                                }
                                                ProcessPostRequest('/api/add_to_talk',request_data).then(res =>{
                                                    if(res.code !== 200){
                                                        return alert(res.message);
                                                    }
                                                    setTalk(res.talk);
                                                    return alert('Success! Changes has been made');
                                                }).catch(err =>{
                                                    console.log(err);
                                                });
                                            }}
                                         className={
                                             `btn ${
                                                 talk !== null && 
                                                 talk.attendees_id !== null &&
                                                talk.attendees_id.split(',').includes(attendee.id.toString()) ?
                                              'btn-danger' : 'btn-primary'}`
                                            }
                                         >
                                            {
                                                talk !== null && 
                                                talk.attendees_id !== null &&
                                                talk.attendees_id.split(',').includes(attendee.id.toString()) ?
                                                'Remove' : 'Select'
                                            }
                                         </button>
                                    </td>
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </section>
    );
}


const AddTalkForm = () => {
    const [talk,setTalk] = useState({
        talk_title : '',
        speaker_name : '',
        allocated_time : '',
        location : '',
        talk_date : ''
    });
    const [is_loading,setLoadingStatus] = useState(false);
    return(
        <section className="tab-body-section">
                <form method="POST" onSubmit={(event)=>{
                        event.preventDefault();
                        setLoadingStatus(true);
                        ProcessPostRequest(`/api/add_talk`,talk).then(res=>{
                            setLoadingStatus(false);
                            if(res.code !== 200){
                               return alert(res.message);
                                //NotificationManager.error(res.message,'Opps!',3000);
                            }
                            setTalk({
                                talk_title : '',
                                speaker_name : '',
                                allocated_time : '',
                                location : '',
                                talk_date : ''
                            });
                            return alert('Success! Talk saved');
                        }).catch(err =>{
                            NotificationManager.error('Something went wrong','Opps!',3000);
                        });
                    }
                }>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Talk Title *</label>
                                <input 
                                    className="form-control" 
                                    value={talk.title}
                                    placeholder="Enter Talk Title"
                                    required
                                    onChange={(event)=>setTalk({...talk,talk_title:event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Speaker Name *</label>
                                <input 
                                    className="form-control" 
                                    value={talk.speaker_name}
                                    placeholder="Enter Speaker Name"
                                    required
                                    onChange={(event)=>setTalk({...talk,speaker_name:event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Time Allocated *</label>
                                <input 
                                    type="input"
                                    className="form-control" 
                                    value={talk.time_allocated}
                                    placeholder="Allocate time"
                                    required
                                    onChange={(event)=>setTalk({...talk,allocated_time:event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Talk Date *</label>
                                <input 
                                    type="date"
                                    className="form-control" 
                                    value={talk.talk_date}
                                    placeholder="Allocate time"
                                    required
                                    onChange={(event)=>setTalk({...talk,talk_date:event.target.value})}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Location*</label>
                                <input 
                                    className="form-control" 
                                    value={talk.location}
                                    placeholder="Location"
                                    required
                                    onChange={(event)=>setTalk({...talk,location:event.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row text-center">
            <button className="btn btn-primary submit_btn" disabled={is_loading}>
                {is_loading ? 'Please Wait' : 'Submit'}
            </button>
                    </div>
                </form>
            </section>
    )
}

export const AddAttendeeToList = () => {
    const [attendees,setAttendee] = useState([]);
    const [talk,setTalk] = useState(null);
    const {talk_id} = useParams();
    console.log(talk_id);
    useEffect(()=>{
        ProcessGetRequest(`/api/get_attendees?talk_id=${talk_id}`).then(res =>{
            setAttendee(res.attendees);
            setTalk(res.talk);
        }).catch(err =>{
            console.log(err);
        });
    },[

    ]);
    return(
        <div className="container">
            <AddAttendeesList
                attendees={attendees} 
                talk_id={talk_id} 
                setTalk={setTalk} 
                talk={talk}
            />
        </div>
    )
}

export const AddAttendees = () => {
    const [show_list,setShowList] = useState(false);
    const [attendees,setAttendee] = useState([]);
    return(
        <div className="container">
            <section className="tab-header-section">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                           onClick={()=>setShowList(false)}
                        >Add New Attendee</button>
                    </div>
                    <div className="col-md-6 text-center">
                        <button type="button" className="btn btn-primary"
                            onClick={()=>{
                                setShowList(true)
                                ProcessGetRequest('/api/get_attendees').then(res => {
                                    setAttendee(res.attendees);
                                }).catch(err => {
                                    console.log(err);
                                });
                            }}
                        >See Attendees Lists</button>
                    </div>
                </div>
            </section>
            {
                show_list ? <AddAttendeesList 
                    attendees={attendees} 
                    talk_id="" 
                    setTalk="" 
                    talk=""
                /> : <AddAttendeesForm />
            }
        </div>
    )
}


export const AddAttendeesForm = () => {
    const [is_loading,setLoadingStatus] = useState(false);
    const [attendee,setAttendee] = useState({
        full_name : '',
        email : ''
    });
    return(
        <section className="tab-body-section">
        <form method="POST"
            onSubmit={(event)=>{
                event.preventDefault();
                setLoadingStatus(true);
                ProcessPostRequest('/api/create_attendees',attendee).then(res=>{
                    setLoadingStatus(false);
                    if(res.code !== 200){
                        return alert(res.message);
                    }
                    setAttendee({
                        email : '',
                        full_name : ''
                    });
                    return alert('Success! Record saved');
                }).catch(err =>{
                    setLoadingStatus(false);
                    console.log(err);
                });
            }}
        >
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Email *</label>
                        <input 
                            type="email"
                            className="form-control" 
                            value={attendee.email}
                            placeholder="Enter Email"
                            required
                            onChange={(event)=>setAttendee({ ...attendee,email: event.target.value})}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input 
                            className="form-control" 
                            value={attendee.full_name}
                            placeholder="Enter Full Name"
                            required
                            onChange={(event)=>setAttendee({ ...attendee,full_name: event.target.value})}
                        />
                    </div>
                </div>
            </div>
            <div className="row text-center">
                <button className="btn btn-primary submit_btn" disabled={is_loading}>
                    {is_loading ? 'Please Wait...' : 'Submit'}
                </button>
            </div>
        </form>
    </section>
    )
}

export const Header = () => (
    <header>
        <nav>
            <ul className="nav-item">
                <li><Link to="/">Add Talk</Link></li>
                <li><Link to="/add_attendees">Add Attendees</Link></li>
            </ul>
        </nav>
    </header>
) 