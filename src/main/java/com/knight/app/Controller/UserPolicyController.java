package com.knight.app.Controller;

import com.knight.app.Repository.UserRepository;
import com.knight.app.entities.Policy;
import com.knight.app.mapper.PolicyMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@CrossOrigin
@RequestMapping(path="/user/policy")
public class UserPolicyController {
    @Autowired
    private UserRepository userRepository;

	@Autowired
	private PolicyMapper policyMapper;

	@PostMapping(path="/list")
	public @ResponseBody JSONObject getClaimList(@RequestBody JSONObject jso) {
		String phone_number = jso.getString("phone_number");
		List<JSONObject> policyList = policyMapper.getPolicyByPhoneNumber(phone_number);

		for(int i = 0 ; i < policyList.size(); i++){
			String policyNumber = policyList.get(i).getString("policy_number");
			JSONObject onemsg = policyList.get(i);
//			onemsg.put("id_number", userRepository.findOne(phone_number).getId_number());
			onemsg.putAll(policyMapper.getStates(policyNumber));
			policyList.set(i, onemsg);
		}
		JSONObject result = new JSONObject();

		if(policyList.size() == 0){
			result.put("Checkcode","200");
			result.put("Message","it doesn't exist");
		}else{
			result.put("Checkcode","100");
			result.put("Message", policyList);
		}
		return result;
	}

	@PostMapping(path="/renew")
	public @ResponseBody JSONObject reNew(@RequestBody JSONObject jso) {
		String policy_number = jso.getString("policy_number");
		String newDate = jso.getString("end_time");

		JSONObject policy = policyMapper.getPolicy(policy_number);
		policy.put("end_time", newDate);
		policyMapper.updatePolicy(policy);

		JSONObject result = new JSONObject();
		result.put("Checkcode","100");
		result.put("Message", "success");
		return result;
	}

}
