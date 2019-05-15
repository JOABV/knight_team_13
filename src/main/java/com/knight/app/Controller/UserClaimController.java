package com.knight.app.Controller;

import com.knight.app.Repository.UserRepository;
import com.knight.app.entities.Policy;
import com.knight.app.mapper.PolicyMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;

@Controller
@CrossOrigin
@RequestMapping(path="/user/lost_luggage")
public class UserClaimController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PolicyMapper policyMapper;

	@PostMapping(path="/receive")
	public @ResponseBody JSONObject lost_luggage_receive (@RequestBody JSONObject jso) {
		JSONObject result = new JSONObject();

		if (jso.has("policy_number")){
			String policy_number = jso.getString("policy_number");
			JSONObject states = policyMapper.getStates(policy_number);
			String s = states.getString("states").split("@@")[0];
			JSONObject message = policyMapper.getPolicy(policy_number);
			message.putAll(states);
			if(s.compareTo("1") == 0){
				message.putAll(policyMapper.getOneMessageFromToProcess(policy_number));
			}else if(s.compareTo("2") == 0){
				message.putAll(policyMapper.getOneMessageFromProcessing(policy_number));
			}else if(s.compareTo("3") == 0){
				message.putAll(policyMapper.getOneMessageFromProcessed(policy_number));
			}
			message.put("id_number", userRepository.findOne(message.getString("phone_number")).getId_number());

			result.put("Checkcode", "100");
			result.put("Message", message);
		}else{
			result.put("Checkcode", "201");
			result.put("Message", "It doesn't exist");
		}
		return result;
	}

	@PostMapping(path="/submit_OR_update")
	public @ResponseBody JSONObject lost_luggage_submit (@RequestBody JSONObject policy) {
		JSONObject p = policyMapper.getOneMessageFromToProcess(policy.getString("policy_number"));
		JSONObject jso = new JSONObject();
//		System.out.println(policy);
		if ( p!= null){
			policyMapper.UpdateToProcess(policy);
			policyMapper.UpdateStates(policy);
			jso.put("Checkcode", "100");
			jso.put("Message", "update");
		}else{
			policyMapper.insertToProcess(policy);
			policyMapper.UpdateStates(policy);
			jso.put("Checkcode", "100");
			jso.put("Message", "submit");
		}
		return jso;
	}
}
