export default {
    setSubscribe(state, subscriber) {
    	//console.log('mutation/setSubscribe', {
    	//	state: state,
    	//	response: subscriber
    	//});
        state.subscriber.mailing = subscriber.mailing;
        state.subscriber.user = subscriber.user;
        state.subscriber.errors = subscriber.errors;
        state.subscriber.success = subscriber.success;
        state.subscriber.list_sub = subscriber.list_sub;
        state.subscriber.requests = subscriber.requests;
    }
}
  