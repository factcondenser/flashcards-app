class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :current_jid, :send_notifications
end
