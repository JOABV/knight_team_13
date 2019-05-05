package com.knight.app.Controller;

import com.knight.app.Repository.UserRepository;
import com.knight.app.mapper.PolicyMapper;
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
		result.put("claim_list", policyList);

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
            }else if(Bigstates.compareTo("102") == 0){
                policy = policyMapper.getOneMessageFromProcessing(policy_number);
            }else{
                policy = policyMapper.getOneMessageFromProcessed(policy_number);
            }
            policy.putAll(policyMapper.getStates(policy_number));
			policy.put("feedback","xxxx@@xxxx@@xxxx");

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
            String states = jso.getString("states");
            JSONObject policy = policyMapper.getOneMessageFromProcessing(policy_number);
            String []claim_states = policy.getString("states").split("@@");

            for (int i = 1; i < claim_states.length; i++) {
                if (claim_states[i].compareTo("0") == 0)
                    claim_states[i] = states;
                else
                    break;
            }
            policy.put("claim_states", String.join("@@", claim_states));
            policyMapper.updateProcessing(policy);

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
            JSONObject policy = policyMapper.getOneMessageFromProcessing(policy_number);
            String []claim_states = policy.getString("states").split("@@");
            if (isAccept.compareTo("0") == 0){
                claim_states[0] = "2";
            }else{
                claim_states[0] = "3";
            }
            policy.put("claim_states", String.join("@@", claim_states));

            policyMapper.deleteToProcess(policy_number);

			if (isAccept.compareTo("0") == 0){
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
