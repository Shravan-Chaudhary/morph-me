package util

import "github.com/spf13/viper"

type Config struct {
	Address      string `mapstructure:"ADDRESS"`
	ClientID     string `mapstructure:"CLIENT_ID"`
	ClientSecret string `mapstructure:"CLIENT_SECRET"`
	RedirectURL  string `mapstructure:"REDIRECT_URL"`
	DatabaseURI  string `mapstructure:"DATABASE_URI"`
	S3_REGION string `mapstructure:"S3_REGION"`
	S3_BUCKET_NAME string `mapstructure:"S3_BUCKET_NAME"`
	S3_ACCESS_KEY string `mapstructure:"S3_ACCESS_KEY"`
	S3_SECRET_KEY string `mapstructure:"S3_SECRET_KEY"`
}

func LoadConfig() (config Config, err error) {
	viper.AddConfigPath(".")
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}