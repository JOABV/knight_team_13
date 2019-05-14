package com.knight.app.Controller;

import com.knight.app.Repository.UserRepository;
import com.knight.app.entities.User;
import com.knight.app.mapper.PolicyMapper;
import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin
@RequestMapping(path="/staff/lost_luggage")
public class StaffClaimController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PolicyMapper policyMapper;


//	@GetMapping(path="/list_html")
//	public String getList(@RequestBody JSONObject jso) {
//		int length = jso.getInt("length");
//		String states = jso.getString("states");
//		String time = jso.getString("time");
//		String place = jso.getString("place");
//		String price = jso.getString("price");
//		List<JSONObject> policyList;
//
//		if(states.compareTo("101") == 0){
//			if(time.compareTo("101") == 0){
//				policyList = policyMapper.getToProcessListByOrderForLength(length,place,price);
//			}else{
//				policyList = policyMapper.getToProcessListByInvertedOrderForLength(length,place,price);
//			}
//		}else if(states.compareTo("102") == 0){
//			if(time.compareTo("101") == 0){
//				policyList = policyMapper.getProcessingListByOrderForLength(length,place,price);
//			}else{
//				policyList = policyMapper.getProcessingListByInvertedOrderForLength(length,place,price);
//			}
//		}else{
//			if(time.compareTo("101") == 0){
//				policyList = policyMapper.getProcessedListByOrderForLength(length,place,price);
//			}else{
//				policyList = policyMapper.getProcessedListByInvertedOrderForLength(length,place,price);
//			}
//		}
//		JSONObject result = new JSONObject();
//		result.put("Checkcode", "100");
//		result.put("Message", policyList);
//
//		return result;
//	}

	@PostMapping(path="/list")
	public @ResponseBody JSONObject getClaimList(@RequestBody JSONObject jso) {
		int length = jso.getInt("length");
		String states = jso.getString("states");
		String time = jso.getString("time");
		String place = jso.getString("place");
		String price = jso.getString("price");
		List<JSONObject> policyList;

		if(states.compareTo("101") == 0){
			if(time.compareTo("101") == 0){
				policyList = policyMapper.getToProcessListByOrderForLength(length,place,price);
			}else{
				policyList = policyMapper.getToProcessListByInvertedOrderForLength(length,place,price);
			}
		}else if(states.compareTo("102") == 0){
			if(time.compareTo("101") == 0){
				policyList = policyMapper.getProcessingListByOrderForLength(length,place,price);
			}else{
				policyList = policyMapper.getProcessingListByInvertedOrderForLength(length,place,price);
			}
		}else{
			if(time.compareTo("101") == 0){
				policyList = policyMapper.getProcessedListByOrderForLength(length,place,price);
			}else{
				policyList = policyMapper.getProcessedListByInvertedOrderForLength(length,place,price);
			}
		}
		JSONObject result = new JSONObject();
		result.put("Checkcode", "100");
		result.put("Message", policyList);

		return result;
	}

	@PostMapping(path="/one_Message")
	public @ResponseBody JSONObject lost_luggage_message (@RequestBody JSONObject jso) {
		JSONObject back = new JSONObject();
		if(jso.has("policy_number") && jso.has("states")){
            String policy_number = jso.getString("policy_number");
            String Bigstates = jso.getString("states");
            JSONObject policy;

            if(Bigstates.compareTo("101") == 0){
                policy = policyMapper.getOneMessageFromToProcess(policy_number);
				policy.put("feedback","xxxx@@xxxx@@xxxx");
            }else if(Bigstates.compareTo("102") == 0){
                policy = policyMapper.getOneMessageFromProcessing(policy_number);
            }else{
                policy = policyMapper.getOneMessageFromProcessed(policy_number);
            }

            policy.putAll(policyMapper.getStates(policy_number));
			policy.putAll(policyMapper.getPolicy(policy_number));
			User user = userRepository.findOne(policy.getString("phone_number"));
			policy.put("id_number", user.getId_number());
			policy.put("full_name", user.getFullname());

			back.put("Checkcode", "100");
			back.put("Message", policy);
		}else{
			back.put("Checkcode", "200");
			back.put("Message", "Wrong type");
		}
		return back;
	}

	@PostMapping(path="/feedback_submit")
	public @ResponseBody JSONObject lost_luggage_submit (@RequestBody JSONObject jso) {
		JSONObject back = new JSONObject();
		if(jso.has("policy_number") && jso.has("states") && jso.has("feedback") && jso.has("isTheLastSubmit")){
            String policy_number = jso.getString("policy_number");
            JSONObject policy = policyMapper.getOneMessageFromProcessing(policy_number);
			JSONObject states = policyMapper.getStates(policy_number);
            String []claim_states = states.getString("states").split("@@");
			String []feedbacks = policy.getString("feedback").split("@@");
//			System.out.println(jso);
            for (int i = 1; i < claim_states.length; i++) {
				if (claim_states[i].compareTo("0") == 0) {
					claim_states[i] = jso.getString("states");
					break;
				}
			}
			for (int i = 1; i < feedbacks.length; i++) {
				if (feedbacks[i].compareTo("xxxx") == 0) {
					feedbacks[i] = jso.getString("feedback");
					break;
				}
			}

            if(jso.getString("isTheLastSubmit").compareTo("0") == 0){
				policy.put("states", String.join("@@", claim_states));
				policy.put("feedback", String.join("@@", feedbacks));
				policyMapper.UpdateStates(policy);
				policyMapper.updateProcessing(policy);
			}else{
				claim_states[0] = "3";
            	policy.put("states", String.join("@@", claim_states));
				policy.put("feedback", String.join("@@", feedbacks));
				policyMapper.UpdateStates(policy);
				policyMapper.deleteProcessing(policy_number);
				policyMapper.insertProcessed(policy);
			}
			back.put("Checkcode", "100");
			back.put("Message", "success");
		}else{
			back.put("Checkcode", "200");
			back.put("Message", "Wrong type");
		}
		return back;
	}

    @PostMapping(path="/claim_accept_OR_reject")
    public @ResponseBody JSONObject lost_luggage_accept_or_reject (@RequestBody JSONObject jso) {
        JSONObject back = new JSONObject();
        if(jso.has("policy_number") && jso.has("isAccept") && jso.has("feedback") && jso.has("staff_number")){
            String policy_number = jso.getString("policy_number");
            String isAccept = jso.getString("isAccept");
            JSONObject policy = policyMapper.getOneMessageFromToProcess(policy_number);
            JSONObject states = policyMapper.getStates(policy_number);
            String []claim_states = states.getString("states").split("@@");
            if (isAccept.compareTo("1") == 0){
                claim_states[0] = "2";
            }else{
                claim_states[0] = "3";
            }
            states.put("states", String.join("@@", claim_states));
			policyMapper.UpdateStates(states);

            policyMapper.deleteToProcess(policy_number);
            policy.put("feedback", jso.getString("feedback")+"@@xxxx@@xxxx");
            policy.put("staff_number", jso.getString("staff_number"));

			if (isAccept.compareTo("1") == 0){
				policyMapper.insertProcessing(policy);
			}else{
				policyMapper.insertProcessed(policy);
			}

            back.put("Checkcode", "100");
            back.put("Message", "success");
        }else{
            back.put("Checkcode", "200");
            back.put("Message", "Wrong type");
        }
        return back;
    }

}
