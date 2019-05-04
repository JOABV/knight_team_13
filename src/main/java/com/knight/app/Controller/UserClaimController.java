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
			jso.put("Checkcode", 100);
			jso.put("Message", detail);
		}else{
			jso.put("Checkcode", 201);
			jso.put("Message", "It doesn't exist");
		}
		return jso;
	}

	@PostMapping(path="/submit")
	public @ResponseBody JSONObject lost_luggage_submit (@RequestBody Policy policy) {
		JSONObject jso = new JSONObject();
		if (!policyRepository.exists(policy.getPolicy_number())){
			policyRepository.save(policy);
			jso.put("Checkcode", 100);
			jso.put("Message", "success");
		}else{
			jso.put("Checkcode", 202);
			jso.put("Message", "the claim exists");
		}
		return jso;
	}

//	@PostMapping(path="/update")
//	public @ResponseBody JSONObject lost_luggage_update (@RequestBody Policy policy) {
//		JSONObject jso = new JSONObject();
//		if (!policyRepository.exists(policy.getPolicy_number())){
//			policyRepository.save(policy);
//			jso.put("Checkcode", 100);
//			jso.put("Message", "success");
//		}else{
//			jso.put("Checkcode", 202);
//			jso.put("Message", "the claim exists");
//		}
//		return jso;
//	}

//	@GetMapping(path="/all")
//	public @ResponseBody Iterable<User> getAllUsers() {
//		return userRepository.findAll();
//	}

}
