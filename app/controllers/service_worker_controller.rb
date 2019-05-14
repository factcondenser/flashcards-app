class ServiceWorkerController < ApplicationController
  protect_from_forgery except: [:service_worker, :push]

  def service_worker
  end

  def manifest
  end

  def push
    StudyTimeWorker.perform_in(1.minute, notification_params.to_h)

    head :no_content
  end

  private

  def notification_params
    params.permit(:message, subscription: [:endpoint, keys: [:p256dh, :auth]])
  end
end
