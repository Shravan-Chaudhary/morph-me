package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func GetUserInfo(accessToken string) (map[string]interface{}, error) {
	userInfoEndpoint := "https://www.googleapis.com/oauth2/v2/userinfo"
	resp, err := http.Get(fmt.Sprintf("%s?access_token=%s", userInfoEndpoint, accessToken))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var userInfo map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&userInfo)
	if err != nil {
		return nil, err
	}

	return userInfo, nil
}