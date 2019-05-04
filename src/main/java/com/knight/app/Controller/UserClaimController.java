package com.knight.app.Controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.knight.app.Repository.PolicyRepository;
import com.knight.app.Repository.UserRepository;
import com.knight.app.entities.Policy;
import com.knight.app.entities.User;
import com.knight.app.mapper.PolicyMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@Controller
@CrossOrigin
@RequestMapping(path="/user/lost_luggage")
public class UserClaimController {
	@Autowired
	private UserRepository userRepository;

	private PolicyMapper policyMapper;

	@Autowired
	private PolicyRepository policyRepository;

	@PostMapping(path="/receive")
	public @ResponseBody JSONObject lost_luggage_receive (@RequestBody JSONObject jso) {
		JSONObject result = new JSONObject();
		if (policyRepository.exists(jso.getString("policy_number"))){
			Policy detail = policyRepository.findOne("policy_number");
			result.put("Checkcode", 100);
			result.put("Message", detail);
		}else{
			result.put("Checkcode", 201);
			result.put("Message", "It doesn't exist");
		}
		return result;
	}

	@PostMapping(path="/submit")
	public @ResponseBody JSONObject lost_luggage_submit (@RequestBody JSONObject policy) {
		JSONObject jso = new JSONObject();
		if (!policyRepository.exists(policy.getString("policy_number"))){
			Date date = new Date();
			Policy p = new Policy(policy.getString("policy_number"),policy.getString("policy_name"),
					policy.getString("phone_number"),date,policy.getString("place"),
					policy.getString("reason"),policy.getString("price"),policy.getString("picture"),
					policy.getString("claim_states"));
			policyRepository.save(p);
			jso.put("Checkcode", 100);
			jso.put("Message", "success");
		}else{
			jso.put("Checkcode", 202);
			jso.put("Message", "the claim exists");
		}
		return jso;
	}
}
