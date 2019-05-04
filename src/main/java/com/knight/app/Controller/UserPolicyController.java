package com.knight.app.Controller;

import com.knight.app.Repository.PolicyRepository;
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
	private PolicyMapper policyMapper;

	@Autowired
	private PolicyRepository policyRepository;

	@PostMapping(path="/list")
	public @ResponseBody JSONObject getClaimList(@RequestBody JSONObject jso) {
		String phone_number = jso.getString("phone_number");
		Policy policy = policyRepository.findOne(phone_number);
		JSONObject result = new JSONObject();

		if(policy == null){
			result.put("Checkcode","200");
			result.put("Message","it doesn't exist");
		}else{
			List<Policy> policyList = policyMapper.getPolicyByPhoneNumber(phone_number);
			result.put("Checkcode","123");
			result.put("Message", policyList);
		}
		return result;
	}
}
